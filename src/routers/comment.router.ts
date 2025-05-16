import { Router } from "express";
import { auth } from "../middleware/auth";
import { createComments, deleteComment, getPostComments, updateComment } from "../controllers/comment.controller";

const router:Router = Router()

router.post('/create/:id',auth,createComments)
router.get('/post/:id',auth,getPostComments)
router.put('/update/:id/:postId',auth,updateComment)
router.delete('/delete/:id/:postId',auth,deleteComment)

export default router