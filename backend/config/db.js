import dotenv from 'dotenv';
dotenv.config();

import { neon } from "@neondatabase/serverless";

const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD } = process.env;


export const sql = neon(`postgresql://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}?sslmode=require`);

// async function getPgVersion() {
//   const result = await sql`SELECT version()`;
//   console.log(result[0]);
// }

// getPgVersion();