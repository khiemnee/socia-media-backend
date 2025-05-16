// src/redis/client.ts
import { createClient } from "redis";

export const redisPub = createClient(); // Publisher
export const redisSub = createClient(); // Subscriber
export const redis = createClient()

redisPub.connect()
redisSub.connect()
redis.connect()