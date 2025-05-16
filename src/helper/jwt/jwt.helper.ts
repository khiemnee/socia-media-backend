import jwt from 'jsonwebtoken'
import { SOCIALACCESSTOKEN, SOCIALREFESHKEY } from '../../secret';

export const generateAccessToken = (id:String) =>{
    return jwt.sign({id:id}, SOCIALACCESSTOKEN!.toString(), { expiresIn: "15m" });
} 

export const generateRefreshToken  = (id:String) =>{

    return jwt.sign({id:id}, SOCIALREFESHKEY!.toString(), { expiresIn: "7d" });
} 