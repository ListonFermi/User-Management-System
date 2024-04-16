import { Router} from "express";
import userController from "../controllers/userController";
import { upload } from "../services/multer";
const userRouter = Router()

userRouter.post('/signup', userController.signupPost )
userRouter.post('/login', userController.loginPost)
userRouter.post('/verifyUser', userController.verifyUser)
userRouter.post('/uploadImage', upload.single('image'), userController.uploadImage)
userRouter.post('/fetchUserData', userController.fetchUserData)


export default userRouter