import pg from "pg";
import dotenv from "dotenv";
dotenv.config();

export const client = new pg.Pool({
  connectionString: `${process.env.REN_PG_URI}`,
});
