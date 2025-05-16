import { Router } from "express";
import { auth } from "../middleware/auth";
import { createPost,followingUserPost ,deletePost, getPost, getPosts, likePost, unlikePost, updatePost } from "../controllers/post.controller";

const router:Router = Router()

router.post('/create',auth,createPost)
router.get('/',auth,getPosts)
router.get('/get/:id',auth,getPost)
router.put('/update/:id',auth,updatePost)
router.delete('/delete/:id',auth,deletePost)
router.post('/like/:id',auth,likePost)
router.delete('/unlike/:id',auth,unlikePost)
router.get('/feed',auth,followingUserPost)

export default router