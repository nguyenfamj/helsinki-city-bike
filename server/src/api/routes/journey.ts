import express from 'express';

const router = express.Router();

// Import controllers
import { getJourneys, createJourney } from '../controllers/journey';

// @route GET api/journeys
// @desc Get all journeys in the data base with pagination
// @access Public
// @params: page, size, search
router.get('/', getJourneys);

// @route POST api/journeys
// @desc Create new journey
// @access Public
router.post('/', createJourney);

export default router;
