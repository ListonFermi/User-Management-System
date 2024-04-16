import jwt from "jsonwebtoken";
import { client } from "../config/dbConnect";

type DecodedJWT = {
  email: string;
  iat: number;
  exp: number;
};

type Row = {
  id: string;
  username: string;
  email: string;
  phone: string;
};

export default {
  adminLoginPost: async (req: any, res: any) => {
    try {
      const { email, password } = req.body;

      const emailMatch = email === process.env.ADMIN_EMAIL;
      const passMatch = password === process.env.ADMIN_PASS;

      if (emailMatch && passMatch) {
        const adminJWT = jwt.sign({ email }, String(process.env.JWT_KEY), {
          expiresIn: "1h",
        });

        res.status(200).send({ success: true, adminJWT });
      } else {
        res
          .status(401)
          .send({ success: false, message: "Invalid Credentials" });
      }
    } catch (error) {
      console.log(error);
    }
  },
  adminDashboardData: async (req: any, res: any) => {
    try {
      //grabing all user data from db
      // await client.connect();
      const query = `SELECT id,username,email,phone FROM users`;
      const dashboardData: { rows: Row[] } = await client.query(query);

      res
        .status(200)
        .send({ success: true, dashboardData: dashboardData?.rows });
    } catch (error) {
      res
        .status(500)
        .send({ success: false, message: "Failed to fetch data from db" });
    }
    // finally{
    //   await client.end();
    // }
  },
  verifyAdmin: async (req: any, res: any) => {
    try {
      const { adminJWT } = req.body;
      const verifyJWT = jwt.verify(
        adminJWT,
        String(process.env.JWT_KEY)
      ) as DecodedJWT;

      if (verifyJWT.email !== process.env.ADMIN_EMAIL) {
        return res
          .status(401)
          .send({ success: false, message: "Admin JWT failed to verify" });
      }
      return res
        .status(200)
        .send({ success: true, message: "Admin JWT verified successfully" });
    } catch (error: any) {
      if (error?.message === "invalid signature") {
        res
          .status(401)
          .send({ success: false, message: "Admin JWT failed to verify" });
      }
    }
  },
  editUser: async (req: any, res: any) => {
    try {
      const {id} = req.params
      const { username, email, phone } = req.body;

      // await client.connect();
      const query = `UPDATE users SET username= $1 , email = $2, phone = $3 WHERE id = $4`
      await client.query(query,[username, email, phone, id])

      res.status(200).send({success: true})

    } catch (error) {
        console.log(error)
    }
    // finally{
    //   await client.end();
    // }
  }
};
