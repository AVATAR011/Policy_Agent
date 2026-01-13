import Database from "better-sqlite3";
import { VECTOR_DB_PATH } from "../config/db.js";

const db = new Database(VECTOR_DB_PATH);

const rows = db.prepare(`
  SELECT json_extract(metadata, '$.policyClass') AS class, COUNT(*) 
FROM vectors 
GROUP BY class;
`).all();
console.log(rows);