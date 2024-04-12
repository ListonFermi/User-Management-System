import { Router} from "express";
import userController from "../controllers/userController";
const userRouter = Router()

userRouter.post('/signup', userController.signupPost )

export default userRouter