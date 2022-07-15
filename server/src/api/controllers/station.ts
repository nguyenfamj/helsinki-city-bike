import { Request, Response } from 'express';
import db from '../../db/index';

// Import helper functions
import { fullTextSearchProcessor } from '../helpers/textProcessing';

export const getStations = async (req: Request, res: Response): Promise<void> => {
  try {
    let { size, page, search } = req.query;

    size = size || process.env.DEFAULT_PAGE_SIZE;
    page = page || process.env.DEFAULT_PAGE_INDEX;
    search = fullTextSearchProcessor(search);

    const countParams: any[] = search !== '' ? [search] : [];
    const queryParams: any[] = search !== '' ? [size, page, search] : [size, page];

    // Prepared query string
    const countQueryString: string = `SELECT COUNT(*) FROM station_data ${
      search !== '' ? 'WHERE ts @@ to_tsquery($1)' : ''
    }`;
    const stationsQueryString: string = `SELECT station_id, fi_name, se_name, en_name, fi_address, se_address, fi_city, se_city, operator_name, capacity, longitude, latitude FROM station_data ${
      search !== '' ? 'WHERE ts @@ to_tsquery($3)' : ''
    } ORDER BY station_id LIMIT $1 OFFSET (($2 - 1) * $1)`;

    // Query initiation
    const { rows: countRow } = await db.query(countQueryString, countParams);
    const { rows: stationRows } = await db.query(stationsQueryString, queryParams);

    // Success response
    res.status(200).json({
      success: true,
      message: `Station data in page ${page} retrieved successfully`,
      totalRowCount: countRow[0].count,
      currentPage: page,
      size,
      stations: stationRows,
    });
    //
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

export const getSingleStation = async (req: Request, res: Response): Promise<void> => {
  const { id: station_id } = req.params;
};
