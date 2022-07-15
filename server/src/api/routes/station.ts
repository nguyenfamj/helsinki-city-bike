import express from 'express';
const router = express.Router();

// Import controllers
import { getStations, getSingleStation } from '../controllers/station';

// @route GET api/stations
// @desc Get all stations in the data base with pagination
// @access Public
// @params: page, size, search
router.get('/', getStations);

// @route GET api/stations/:id
// @desc Get data about a single station
// @access Public
router.get('/:id', getSingleStation);

// @route POST api/stations
// @desc Create new station
// @access Public
// router.post('/');

export default router;
