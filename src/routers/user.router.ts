import { Router } from "express";
import { auth } from "../middleware/auth";
import { followersUser, followingUser, followUser, getUser, unfollowUser, updateProfile } from "../controllers/user.controller";
import upload from "../middleware/upload";

const router:Router = Router()

router.get('/:id',auth,getUser)
router.put('/updateProfile',auth,upload.single('avatar'),updateProfile)
router.post('/follow/:id',auth,followUser)
router.get('/following/:id',auth,followingUser)
router.get('/followers/:id',auth,followersUser)
router.delete('/unfollow/:id',auth,unfollowUser)

export default router