import express from "express";
import dotenv from "dotenv";
import userRouter from "./routes/userRoutes";
import dbConnect from "./config/dbConnect";
import cookieParser from "cookie-parser"
import adminRouter from "./routes/adminRoutes";
import cors from 'cors'


const app = express();
dotenv.config();
dbConnect().then(()=>console.log('ElephantSQL connected succesfully'))

app.use(cors());
// const allowCrossDomain = (req: any, res: any, next: any) => {
//   res.header(`Access-Control-Allow-Origin`, process.env.FRONTEND_URL);
//   res.header(`Access-Control-Allow-Methods`, `GET,PUT,POST,DELETE`);
//   res.header(`Access-Control-Allow-Headers`, `Content-Type`);
//   next();
// };
// app.use(allowCrossDomain);

app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

app.use("/user", userRouter);
app.use("/admin", adminRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Server started running in http://localhost:${PORT}/`)
);
