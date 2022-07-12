import path from 'path';
import { Pool, QueryResult, PoolClient } from 'pg';
import { migrate } from 'postgres-migrations';

require('dotenv').config();

// Config to connect database in Docker
const poolConfig = {
  database: process.env.DATABASE,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  max: Number(process.env.DB_POOL_SIZE),
  idleTimeoutMillis: Number(process.env.DB_POOL_CLIENT_IDLE_TIMEOUT),
  connectionTimeoutMillis: Number(process.env.DB_POOL_CLIENT_CONNECTIONS_TIMEOUT),
};

const pool: Pool = new Pool(poolConfig);

const db = {
  // To run migrations to the database everytime there is new SQL file in db/migrations/sql folder
  runMigrations: async function (): Promise<void> {
    const client = await pool.connect();
    try {
      await migrate({ client }, path.resolve(__dirname, 'migrations/sql'));
    } catch (err) {
      console.log('Failed', err);
    } finally {
      client.release();
    }
  },

  // Customized query function for database
  query: async function (text: string, params?: any): Promise<QueryResult<any>> {
    const start: number = Date.now();
    const res = await pool.query(text, params);
    const duration = Date.now() - start;

    console.log('query executed', { text, duration, rows: res.rowCount });

    return res;
  },

  getClient: async function (): Promise<PoolClient> {
    const client: PoolClient = await pool.connect();

    const release = client.release;

    // set a timeout of 5 seconds
    const timeout = setTimeout(() => {
      console.error('A client has been checked out for more than 5 seconds!');
    }, 5000);

    client.release = () => {
      clearTimeout(timeout);

      client.release = release;
      return release.apply(client);
    };
    return client;
  },
};

export default db;
