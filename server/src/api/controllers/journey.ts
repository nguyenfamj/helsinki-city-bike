import { Request, Response } from 'express';
import db from '../../db/index';

export const getJourneys = async (req: Request, res: Response): Promise<void> => {
  try {
    let { size, page } = req.query;

    // Prepared query string
    const countQueryString: string = `SELECT COUNT(*) FROM journey_data`;
    const journeysQueryString: string = `SELECT * FROM journey_data ORDER BY departure_time DESC LIMIT $1 OFFSET (($2 - 1) * $1)`;

    size = size || process.env.DEFAULT_PAGE_SIZE;
    page = page || process.env.DEFAULT_PAGE_INDEX;

    // Query initiation
    const { rows: countRow } = await db.query(countQueryString);
    const { rows: journeyRows } = await db.query(journeysQueryString, [size, page]);

    // Success response
    res.status(200).json({
      success: true,
      message: `Data in page ${page} retrieved successfully`,
      totalRowCount: countRow[0].count,
      currentPage: page,
      size: size,
      journeys: journeyRows,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};
