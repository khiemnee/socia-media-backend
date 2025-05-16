import jwt from 'jsonwebtoken'

export const generateAccessToken = (id:String) =>{
    return jwt.sign({id:id}, 'socialAccessKey', { expiresIn: "15m" });
} 

export const generateRefreshToken  = (id:String) =>{

    return jwt.sign({id:id}, 'socialRefreshKey', { expiresIn: "7d" });
} 