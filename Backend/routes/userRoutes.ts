import { Router} from "express";
import userController from "../controllers/userController";
const userRouter = Router()

userRouter.post('/signup', userController.signupPost )
userRouter.post('/login', userController.loginPost)
userRouter.post('/verifyUser', userController.verifyUser)

export default userRouter