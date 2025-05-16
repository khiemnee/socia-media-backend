import { Router } from "express";
import { auth } from "../middleware/auth";
import { deleteNotifications, getNotifications, readNotifications } from "../controllers/notification.controller";

const router:Router = Router()

router.get('/',auth,getNotifications)
router.put('/update/:id',auth,readNotifications)
router.delete('/delete/:id',auth,deleteNotifications)

export default router