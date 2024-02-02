import pg from "pg";
import dotenv from "dotenv";
dotenv.config();

export const pool = new pg.Pool({
  connectionString: `${process.env.REN_PG_URI}`,
  max: 20,
  idleTimeoutMillis: 60000,
  connectionTimeoutMillis: 15000,
});
// set pool to contain a max of 20 active clients
// remove a client after 1 min of idling/inactivity
// limit time for db connection establishment to 15 seconds
