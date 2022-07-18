import { Request, Response } from 'express';
import db from '../../db/index';

// Import interfaces
import { stationData } from '../interfaces/station';
// Import helper functions
import { fullTextSearchProcessor } from '../helpers/textProcessing';

// @controllers GET api/stations
// @desc Get all stations in the data base with pagination
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
    const { rows: stationRows }: { rows: stationData[] } = await db.query(
      stationsQueryString,
      queryParams
    );

    // Success response
    res.status(200).json({
      success: true,
      message: `Station data in page ${page} retrieved successfully`,
      totalRowCount: countRow[0].count,
      currentPage: page,
      size,
      stations: stationRows,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

// @controllers GET api/stations/:id
// @desc Get data about single station
export const getSingleStation = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id: station_id } = req.params;
    if (!station_id) throw new Error('Station id not found on query params');

    // Query Params
    const stationDataParams: any[] = [station_id];
    const tempTableParams: any[] = [station_id];

    // Prepared query string
    // Station data
    const stationDataQueryString = `SELECT station_id, fi_name, se_name, en_name, fi_address, se_address, fi_city, se_city, operator_name, capacity, longitude, latitude
    FROM station_data
    WHERE station_id=$1`;
    // Create temporary table in the database for querying in this session
    const stationTempTableQueryString: string = `CREATE TEMP TABLE station_${station_id} AS
    (SELECT targeted_station.station_id, targeted_station.fi_name, targeted_station.se_name, targeted_station.en_name,
           targeted_station.fi_address, targeted_station.se_address, targeted_station.fi_city, targeted_station.se_city,
           targeted_station.operator_name, targeted_station.capacity, targeted_station.longitude, targeted_station.latitude,
           journey_data.covered_distance, journey_data.duration, journey_data.departure_station_id, journey_data.departure_station_name,
           journey_data.return_station_id,journey_data.return_station_name
    FROM
    (SELECT station_id, fi_name, se_name, en_name, fi_address, se_address, fi_city, se_city, operator_name, capacity, longitude, latitude
    FROM station_data
    WHERE station_id=$1) AS targeted_station
    INNER JOIN journey_data
        ON targeted_station.station_id=journey_data.departure_station_id
        OR targeted_station.station_id=journey_data.return_station_id)`;
    // Journey starting from the station
    const journeysFromStationQueryString = `SELECT COUNT(*) FROM station_${station_id} WHERE station_id=departure_station_id;`;
    // Journeys ending at the station
    const journeysToStationQueryString = `SELECT COUNT(*) FROM station_${station_id} WHERE station_id=return_station_id;`;
    // Average distance from the station
    const avgDistanceFromStationQueryString = `SELECT avg(covered_distance) FROM station_${station_id} WHERE station_id=departure_station_id;`;
    // Average distance to the station
    const avgDistanceToStationQueryString = `SELECT avg(covered_distance) FROM station_${station_id} WHERE station_id=return_station_id;`;
    // Top 5 destination from the station
    const topPlacesFromStationQueryString = `SELECT return_station_name, return_station_id, COUNT(return_station_name) AS counted
    FROM station_${station_id}
    WHERE station_id !=station_${station_id}.return_station_id
    AND return_station_name IS NOT NULL
    GROUP BY return_station_name, return_station_id
    ORDER BY counted DESC
    LIMIT 5;`;
    // Top 5 departures stations for journeys ending at the station
    const topPlacesToStationQueryString = `SELECT departure_station_name, departure_station_id, COUNT(departure_station_name) AS counted
    FROM station_${station_id}
    WHERE station_id !=station_${station_id}.departure_station_id
    AND return_station_name IS NOT NULL
    GROUP BY departure_station_name, departure_station_id
    ORDER BY counted DESC
    LIMIT 5;`;
    // Drop temp table after session is finished
    const dropTempTable = `DROP TABLE IF EXISTS station_${station_id}`;

    // Query initiation
    const { rows: stationData }: { rows: stationData[] } = await db.query(
      stationDataQueryString,
      stationDataParams
    );
    console.log('station DATA', stationData);
    if (stationData[0]?.station_id) {
      await db.query(stationTempTableQueryString, tempTableParams);
      const { rows: journeysFromStation } = await db.query(journeysFromStationQueryString);
      const { rows: journeysToStation } = await db.query(journeysToStationQueryString);
      const { rows: avgDistanceFromStation } = await db.query(avgDistanceFromStationQueryString);
      const { rows: avgDistanceToStation } = await db.query(avgDistanceToStationQueryString);
      const { rows: topPlacesFromStation } = await db.query(topPlacesFromStationQueryString);
      const { rows: topPlacesToStation } = await db.query(topPlacesToStationQueryString);
      await db.query(dropTempTable);

      // Success response
      res.status(200).json({
        success: true,
        message: `Station ${stationData[0].fi_name} data retrieved successfully`,
        stationData,
        journeysFromStation: journeysFromStation[0].count,
        journeysToStation: journeysToStation[0].count,
        avgDistanceFromStation: avgDistanceFromStation[0].avg,
        avgDistanceToStation: avgDistanceToStation[0].avg,
        topPlacesFromStation,
        topPlacesToStation,
      });
      console.log(`LOG: station's ${station_id} accessed`);
    } else {
      res.status(404).json({ success: false, message: `Station ${station_id} not found` });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

export const createStation = async (req: Request, res: Response): Promise<void> => {
  const {} = req.body;
};
