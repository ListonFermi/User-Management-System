import { Client } from "pg";
import dotenv from "dotenv";

dotenv.config();

export const client = new Client({
  host: process.env.POSTGRES_HOST,
  port: 5432,
  database: process.env.POSTGRES_DATABASE,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
});

export default async () => await client.connect();
