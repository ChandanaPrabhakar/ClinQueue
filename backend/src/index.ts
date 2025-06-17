import express, { json } from "express";
import dotenv from "dotenv";
import { dbconnection } from "./config/db";
import authRouter from "./routes/authRoutes";
import userRouter from "./routes/userRoutes";
import doctorRouter from "./routes/doctorRoutes";

dotenv.config();
dbconnection();

const app = express();

app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/doctor", doctorRouter);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`server listening on ${PORT}.....`);
});
