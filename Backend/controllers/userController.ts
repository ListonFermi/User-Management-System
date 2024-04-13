import { client } from "../config/dbConnect";
import { signupValidator } from "../helpers/formValidations";
import bcrypt from "bcryptjs";

export default {
  signupPost: async (req: any, res: any) => {
    try {
      console.log("came here");
      const validate = signupValidator(req.body);
      if (!validate)
        return res
          .status(203)
          .send({ success: false, message: "Invalid form data" });

      const { username, email, phone, password } = req.body;

      const encryptedPassword = bcrypt.hashSync(password, 10);

      const query = `
        INSERT INTO users (username, email, phone, password) 
        VALUES ($1, $2, $3, $4)
      `;

      const result = await client.query(query, [
        username,
        email,
        phone,
        encryptedPassword,
      ]);

      console.log(result);

      res.status(200).send({ success: true });
    } catch (error) {
      console.log(error);
    }
  },
};
