import express from "express";
import dotenv from "dotenv";
import userRouter from "./routes/userRoutes";

const app = express();
dotenv.config();

const allowCrossDomain = (req: any, res: any, next: any) => {
  res.header(`Access-Control-Allow-Origin`, '*');
  res.header(`Access-Control-Allow-Methods`, `GET,PUT,POST,DELETE`);
  res.header(`Access-Control-Allow-Headers`, `Content-Type`);
  next();
};
app.use(allowCrossDomain);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/user", userRouter);

const PORT = process.env.PORT;
app.listen(PORT, () =>
  console.log(`Server started running in http://localhost:${PORT}/`)
);