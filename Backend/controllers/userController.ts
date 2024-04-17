import { client } from "../config/dbConnect";
import { signupValidator } from "../helpers/formValidations";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

type DecodedJWT = {
  email: string;
  iat: number;
  exp: number;
};

export default {
  signupPost: async (req: any, res: any) => {
    try {
      //Backend Validation
      const validate = signupValidator(req.body);
      if (!validate)
        return res.status(203).send({ success: false, message: "InvalidData" });

      //Inserting the data to postgresql
      const { username, email, phone, password } = req.body;

      try {
        const encryptedPassword = bcrypt.hashSync(password, 10);
        // await client.connect();
        const query = `INSERT INTO users (username, email, phone, password) 
          VALUES ($1, $2, $3, $4)`;
        await client.query(query, [username, email, phone, encryptedPassword]);
      } catch (error: any) {
        if (error.code === "23505") {
          return res
            .status(403)
            .send({ success: false, message: "Credentials already exists" });
        }
      }
      // finally{
      //   await client.end();
      // }

      //Creating a JWT token and sending it in the body
      const userJWT = jwt.sign({ email }, String(process.env.JWT_KEY), {
        expiresIn: "1h",
      });
      return res.status(200).send({ success: true, userJWT });
    } catch (error) {
      console.log(error);
    }
  },
  loginPost: async (req: any, res: any) => {
    try {
      const { email, password } = req.body;

      // await client.connect();
      const query = `SELECT email, password FROM users WHERE email = $1`;
      const result = await client.query(query, [email]);

      if (!result.rows.length) {
        // User not found
        return res
          .status(401)
          .send({ success: false, message: "Invalid email or password" });
      }

      const user = result.rows[0];
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        // Incorrect password
        return res
          .status(401)
          .send({ success: false, message: "Invalid email or password" });
      }

      // Password is correct
      //Creating a JWT token and sending it in the body
      const userJWT = jwt.sign({ email }, String(process.env.JWT_KEY), {
        expiresIn: "1h",
      });
      res
        .status(200)
        .send({ success: true, message: "Login successful", userJWT });
    } catch (error) {
      console.error("Error during login:", error);
      res
        .status(500)
        .send({ success: false, message: "Internal server error" });
    }
    // finally{
    //   await client.end();
    // }
  },
  verifyUser: async (req: any, res: any) => {
    try {
      const { userJWT } = req.body;
      const verifyJWT = jwt.verify(
        userJWT,
        String(process.env.JWT_KEY)
      ) as DecodedJWT;

      return res
        .status(200)
        .send({ success: true, message: "User JWT verified successfully" });
    } catch (error: any) {
      if (error?.message === "invalid signature") {
        res
          .status(401)
          .send({ success: false, message: "User JWT failed to veify" });
      }
    }
  },
  uploadImage: async (req: any, res: any) => {
    try {
      console.log(req.file.filename);

      const { userJWT } = req.body;

      const { email } = jwt.verify(
        userJWT,
        String(process.env.JWT_KEY)
      ) as DecodedJWT;
      
      // await client.connect();
      const query = `UPDATE users SET image = $1 WHERE email = $2`;
      await client.query(query, [req.file.filename, email]);

      res.status(200).send({ success: true });
    } catch (error: any) {
      console.log(error);
    }
    // finally{
    //   await client.end();
    // }
  },
  fetchUserData: async (req: any, res: any) => {
    try {
      const { userJWT } = req.body;

      const { email } = jwt.verify(
        userJWT,
        String(process.env.JWT_KEY)
      ) as DecodedJWT;

      // await client.connect();
      const query = `SELECT username,email,phone,image FROM users WHERE email=$1`;
      const result = await client.query(query, [email]);
      const userData = result.rows[0];

      res.status(200).send({ success: true, userData });
    } catch (error) {
      console.log(error);
    }
    // finally{
    //   await client.end();
    // }
  },
};
