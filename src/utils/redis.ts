// src/redis/client.ts
import { createClient } from "redis";
import { REDISHOST, REDISPASSWORD, REDISPORT, REDISUERNAME } from "../secret";


export const redisPub = createClient({
    username: REDISUERNAME,
    password: REDISPASSWORD,
    socket: {
        host: REDISHOST,
        port: Number(REDISPORT)
    }
});

export const redisSub = createClient({
    username: REDISUERNAME,
    password: REDISPASSWORD,
    socket: {
        host: REDISHOST,
        port: Number(REDISPORT)
    }
});

export const redis = createClient({
    username: REDISUERNAME,
    password: REDISPASSWORD,
    socket: {
        host: REDISHOST,
        port: Number(REDISPORT)
    }
});


redisPub.connect()
redisSub.connect()
redis.connect()