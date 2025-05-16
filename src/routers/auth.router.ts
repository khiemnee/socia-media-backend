import { Router } from "express";
import { authLogin, authLogOut, authRegister, getMe, refreshToken } from "../controllers/auth.controller";
import { auth } from "../middleware/auth";
import upload from "../middleware/upload";

const router:Router = Router()

router.post('/register',upload.single('avatar'),authRegister)
router.post('/login',authLogin)
router.post('/refreshToken',refreshToken)
router.post('/logOut',auth,authLogOut)
router.get('/me',auth,getMe)

export default router