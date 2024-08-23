import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core";
import { drizzle } from "drizzle-orm/node-postgres";
import { Client } from "pg";
export const client = new Client({
  connectionString:
    "postgresql://0g26vc:XATA_API_KEY@us-east-1.sql.xata.sh/hci:main?sslmode=require"
});
