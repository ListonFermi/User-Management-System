import express from "express";
import dotenv from "dotenv";
import userRouter from "./routes/userRoutes";
import path from 'path'
import dbConnect from "./config/dbConnect";
import cookieParser from "cookie-parser"
// import cors from 'cors'


const app = express();
dotenv.config();
dbConnect()

// app.use(cors());
const allowCrossDomain = (req: any, res: any, next: any) => {
  res.header(`Access-Control-Allow-Origin`, process.env.FRONTEND_URL);
  res.header(`Access-Control-Allow-Methods`, `GET,PUT,POST,DELETE`);
  res.header(`Access-Control-Allow-Headers`, `Content-Type`);
  next();
};
app.use(allowCrossDomain);

app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')))

app.use("/user", userRouter);

const PORT = process.env.PORT;
app.listen(PORT, () =>
  console.log(`Server started running in http://localhost:${PORT}/`)
);
