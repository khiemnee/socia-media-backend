import e, { NextFunction, Request,Response } from "express"
import jwt from 'jsonwebtoken'
import {  PrismaClient } from "@prisma/client"
import { SOCIALACCESSTOKEN } from "../secret"


const client = new PrismaClient()

export const auth = async(req:Request,res:Response,next:NextFunction) =>{
    try {
        const token = req.headers.authorization!.replace('Bearer ','')
        const decode =  jwt.verify(token,SOCIALACCESSTOKEN!.toString()) as {id : String}
        const user = await client.user.findFirst({
            where : {
                id : decode.id.toString()
            }
        })

        if(!user){
           throw new Error('Auth not found')
        }

        req.user = user
        next()

    } catch (error) {
        if(error instanceof Error){
            res.status(401).send('Token has expired')
        }
    }
}