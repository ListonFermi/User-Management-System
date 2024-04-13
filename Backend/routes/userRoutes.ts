import { Router} from "express";
import { upload } from "../services/multer";
import userController from "../controllers/userController";
const userRouter = Router()

userRouter.post('/signup', userController.signupPost )

export default userRouter