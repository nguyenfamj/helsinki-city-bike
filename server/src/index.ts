import express, { NextFunction, Request, Response } from 'express';
const cors = require('cors');
import db from './db/index';

// Import router
import journeyRouter from './api/routes/journey';
import stationRouter from './api/routes/station';

// Environment variable import
require('dotenv').config();

const app = express();

// Define default PORT or port variable from environment
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
  db.runMigrations();
});

app.get('/', (req: Request, res: Response) => {
  res.send('RESTRICTED');
});

//  Middleware configuration
app.use(function (req: Request, res: Response, next: NextFunction) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  next();
});
app.use(express.json());
app.use(cors());

// Setup base routing
app.use('/api/journeys', journeyRouter);
app.use('/api/stations', stationRouter);
