import dotenv from 'dotenv'

dotenv.config({})

export const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME
export const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY
export const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET
export const PORT = process.env.PORT
export const SOCIALREFESHKEY = process.env.SOCIALREFESHKEY
export const SOCIALACCESSTOKEN = process.env.SOCIALACCESSTOKEN
export const REDISUERNAME = process.env.REDISUSERNAME
export const REDISPASSWORD = process.env.REDISPASSWORD
export const REDISHOST = process.env.REDISHOST
export const REDISPORT = process.env.REDISPORT