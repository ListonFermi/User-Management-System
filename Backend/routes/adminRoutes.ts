import { Router} from "express";
import adminControllers from "../controllers/adminControllers";
const adminRouter = Router()

adminRouter.post('/login', adminControllers.adminLoginPost)
adminRouter.post('/getdashboarddata', adminControllers.adminDashboardData)
adminRouter.post('/login', adminControllers.adminLoginPost)
adminRouter.post('/verifyAdmin', adminControllers.verifyAdmin)
adminRouter.put('/edit/:id', adminControllers.editUser)
adminRouter.post('/add', adminControllers.addUser)
adminRouter.delete('/delete/:id', adminControllers.deleteUser)

export default adminRouter