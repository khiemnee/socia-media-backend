import { redisPub, redisSub } from "../../utils/redis"
import { io } from "../.."

export const publishNotification = async (data : {
    reciverId : String,
    message : String,
    type : String
}) =>{
    await redisPub.publish('notification',JSON.stringify(data))
}

export const subscribeNotification = async () =>{
     await redisSub.subscribe('notication',(messages)=>{
        const data = JSON.parse(messages)
        const {reciverId,message,type} = data
         io.to(reciverId).emit('new_notification',{message:message,type})
     })
}