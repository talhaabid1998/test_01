import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'
import verifyRefreshToken from '../Controllers/verifyRefreshToken'


const verifyAccessToken = (req: Request, res: Response, next: NextFunction) => {
    const token: string = req.headers['authorization']?.split(' ')[1]!;
    if(!token) {
        
        return res.status(400).json({
            success: false,
            message: 'Missing Token',
        })
    };
    try {
        const docodedClaims = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!);
        if(docodedClaims) {
            return next();
        }
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: 'Invalid or Expired Token',
        })
    }
}

export default verifyAccessToken;