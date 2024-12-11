import jwt from 'jsonwebtoken'
import { Types } from 'mongoose'
const secret=process.env.JWT_SECRET as string

export const generateToken=(id:Types.ObjectId)=>{
    return jwt.sign({id},secret,{expiresIn:"1h"})
}

export const verifyToken = (token: string): jwt.JwtPayload|null => {
    try {
        return jwt.verify(token, secret) as jwt.JwtPayload;
    } catch (error) {
        return null
    }
};
