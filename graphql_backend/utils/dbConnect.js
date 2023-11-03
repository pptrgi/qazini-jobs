import pg from "pg";
import dotenv from "dotenv";
dotenv.config();

const { Pool } = pg;

export const pool = new Pool({
  user: `${process.env.USER_NAME}`,
  host: `${process.env.HOST}`,
  database: `${process.env.DATABASE}`,
  port: process.env.PORT,
  password: `${process.env.PASSWORD}`,
});

console.log(`${process.env.USER_NAME}`);
