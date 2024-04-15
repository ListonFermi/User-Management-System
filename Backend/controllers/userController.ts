import { client } from "../config/dbConnect";
import { signupValidator } from "../helpers/formValidations";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export default {
  signupPost: async (req: any, res: any) => {
    try {
      //Backend Validation
      const validate = signupValidator(req.body);
      if (!validate)
        return res.status(203).send({ success: false, message: "InvalidData" });

      //Inserting the data to postgresql
      const { username, email, phone, password } = req.body;
      const encryptedPassword = bcrypt.hashSync(password, 10);
      const query = `INSERT INTO users (username, email, phone, password) 
        VALUES ($1, $2, $3, $4)`;
      try {
        await client.query(query, [username, email, phone, encryptedPassword]);
      } catch (error: any) {
        if (error.code === "23505") {
          return res
            .status(208)
            .send({ success: false, message: "Credentials already exists" });
        }
      }

      //Creating a JWT token and storing it in the cookies
      const userJWT = jwt.sign({email}, String(process.env.JWT_KEY), {
        expiresIn: '1h',
      });
      res.cookie("userJWT", userJWT,{maxAge: 60*60*1000, domain: process.env.FRONTEND_URL,
      path: '/',
      secure: true,
      httpOnly: true,
      sameSite: 'none' });

      return res.status(200).send({ success: true });
    } catch (error) {
      console.log(error);
    }
  },
};
