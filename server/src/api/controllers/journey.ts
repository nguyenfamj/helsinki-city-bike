import { Request, Response } from 'express';
import db from '../../db/index';

// Import helper functions
import { fullTextSearchProcessor } from '../helpers/textProcessing';

export const getJourneys = async (req: Request, res: Response): Promise<void> => {
  try {
    let { size, page, search } = req.query;

    size = size || process.env.DEFAULT_PAGE_SIZE;
    page = page || process.env.DEFAULT_PAGE_INDEX;
    search = fullTextSearchProcessor(search);

    const countParams: any[] = search !== '' ? [search] : [];
    const queryParams: any[] = search !== '' ? [size, page, search] : [size, page];

    // Prepared query string
    const countQueryString: string = `SELECT COUNT(*) FROM journey_data ${
      search !== '' ? 'WHERE ts @@ to_tsquery($1)' : ''
    }`;
    const journeysQueryString: string = `SELECT fid, departure_time, return_time, departure_station_id, departure_station_name, return_station_id, return_station_name, covered_distance, duration FROM journey_data ${
      search !== '' ? 'WHERE ts @@ to_tsquery($3)' : ''
    } ORDER BY departure_time DESC LIMIT $1 OFFSET (($2 - 1) * $1)`;

    // Query initiation
    const { rows: countRow } = await db.query(countQueryString, countParams);
    const { rows: journeyRows } = await db.query(journeysQueryString, queryParams);

    // Success response
    res.status(200).json({
      success: true,
      message: `Journey data in page ${page} retrieved successfully`,
      totalRowCount: countRow[0].count,
      currentPage: page,
      size,
      journeys: journeyRows,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

export const createJourney = async (
  req: Request,
  res: Response
): Promise<Response<any, Record<string, any>>> => {
  // Take relevant data from the request body
  const {
    departure_time,
    return_time,
    departure_station_id,
    departure_station_name,
    return_station_id,
    return_station_name,
    covered_distance,
    duration,
  } = req.body;

  if (!departure_station_id || !return_station_id)
    return res
      .status(400)
      .json({ success: false, message: "Station's id is required for new journey" });

  try {
    // Query params
    const queryParams = [
      departure_time,
      return_time,
      departure_station_id,
      departure_station_name,
      return_station_id,
      return_station_name,
      covered_distance,
      duration,
    ];

    // Prepared query string
    const createJourneyQueryString = `INSERT INTO journey_data(departure_time, return_time, departure_station_id, departure_station_name, return_station_id, return_station_name, covered_distance, duration)
    VALUES($1, $2, $3, $4, $5, $6, $7, $8)
    RETURNING fid, departure_time, return_time, departure_station_id, departure_station_name, return_station_id, return_station_name, covered_distance, duration;`;

    // Query initiation
    const { rows } = await db.query(createJourneyQueryString, queryParams);

    return res.json({ success: true, message: 'Journey added successfully', returnedRow: rows[0] });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};
