import express, { json } from "express";
import dotenv from "dotenv";
import { dbconnection } from "./config/db";

dotenv.config();
dbconnection();

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`server listening on ${PORT}.....`);
});
