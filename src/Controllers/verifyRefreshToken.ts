import { NextFunction,Request,Response } from "express"
import userModel from '../models/User'
import jwt from 'jsonwebtoken'
const verifyRefreshToken = async (req:Request, res:Response, next:NextFunction) =>{
    const token: string = req.headers['authorization']?.split(' ')[1]!;
    if(token){
        try {
            const docodedClaims: any = jwt.decode(token);
            console.log(docodedClaims)

            const user =await userModel.findById(docodedClaims._id);
            const RT = user.refreshToken
            if(token != RT) {
                return res.status(401).json({
                    success: false,
                    message: 'You are unauthorized'
                })
            }
            return res.json({
                accessToken: jwt.sign({ _id: user._id, email: user.email, phone: user.phone}, process.env.ACCESS_TOKEN_SECRET!)
            })
        } catch (error) {
            console.log(error)
        }
       

        
    }
}
export default verifyRefreshToken;