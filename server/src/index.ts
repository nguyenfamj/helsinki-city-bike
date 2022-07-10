import express, { Request, Response } from 'express';
import db from './db/index';

const PORT = process.env.PORT || 3001;

const app = express();

app.get('/', (req: Request, res: Response) => {
  res.send('This is the new web application');
});

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
  db.runMigrations();
});
