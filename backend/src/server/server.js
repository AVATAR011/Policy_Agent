import express from "express";
import bodyParser from "body-parser";
import searchRoutes from "./routes/search.routes.js";
import ragRoutes from "./routes/rag.routes.js";
import compareRoutes from "./routes/compare.routes.js";
import improveRoutes from "./routes/improve.routes.js";
import chatRoutes from "./routes/chat.routes.js";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import cors from "cors";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

console.log("ENV CHECK:", process.env.OPENAI_API_KEY?.slice(0, 6));

const app = express();
app.use(express.json());

app.use(cors({
  origin: "http://localhost:5173", // or 3000
  credentials: true
}));

// app.use("/api", searchRoutes);
app.use("/chat", chatRoutes);

app.use("/api", ragRoutes);
app.use("/api", compareRoutes);
app.use("/api", improveRoutes);


app.listen(5000, () => console.log("Server running on 5000"));
