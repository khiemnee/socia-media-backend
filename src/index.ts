import express from 'express'
import authRouter from './routers/auth.router'
import userRouter from './routers/user.router'
import postRouter from './routers/post.router'
import commentRouter from './routers/comment.router'
import notificationsRouter from './routers/notification.router'
import cookieParser from "cookie-parser";
import { createServer } from 'http'
import { Server } from 'socket.io'
import { subscribeNotification } from './subscribes/notification'
import cors from 'cors'
import { PORT } from './secret'

const app = express()
const server = createServer(app)
export const io = new Server(server,{
    cors : {
        origin : '*'
    }
})


io.on('connection',(socket)=>{
    socket.on('join',(userId)=>{
        socket.join(userId)
    })

    subscribeNotification()


    console.log("connected")
})

app.use(express.json())
app.use(cookieParser());
app.use(cors())
app.use('/api/auth',authRouter)
app.use('/api/user',userRouter)
app.use('/api/posts',postRouter)
app.use('/api/comment',commentRouter)
app.use('/api/notifications',notificationsRouter)


app.listen(PORT,()=>{
    console.log('server is up')
})

