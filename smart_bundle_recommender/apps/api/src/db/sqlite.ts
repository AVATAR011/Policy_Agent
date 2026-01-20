import Database from "better-sqlite3";
import * as fs from "node:fs";
import * as path from "node:path";

const dataDir = path.resolve(process.cwd(), "data");
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });

const dbFile = path.join(dataDir, "app.db");
const sqlite = new Database(dbFile);

const migrations = fs.readFileSync(
  path.resolve(process.cwd(), "src/db/migrations.sql"),
  "utf8",
);
sqlite.exec(migrations);

export const db = {
  saveQuote(q: {
    request_id: string;
    lifecycle: string;
    input_json: any;
    output_json: any;
  }) {
    const stmt = sqlite.prepare(
      "INSERT OR REPLACE INTO quotes(request_id, lifecycle, input_json, output_json) VALUES(?,?,?,?)",
    );
    stmt.run(
      q.request_id,
      q.lifecycle,
      JSON.stringify(q.input_json),
      JSON.stringify(q.output_json),
    );
  },
  saveFeedback(fb: {
    request_id: string;
    bundle_key: string;
    rating: number;
    comment?: string;
  }) {
    const stmt = sqlite.prepare(
      "INSERT INTO feedback(request_id, bundle_key, rating, comment) VALUES(?,?,?,?)",
    );
    stmt.run(fb.request_id, fb.bundle_key, fb.rating, fb.comment ?? null);
  },
};
