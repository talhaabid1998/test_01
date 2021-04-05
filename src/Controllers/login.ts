import userModel from '../models/User'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv';
// import accessToken from '../jwt/accessTokenGenerator'
import {Request,Response} from 'express'
import jwt from 'jsonwebtoken'
import { resolveSoa } from 'node:dns';
dotenv.config();

const login=async (req:Request, res:Response ) =>{
    const user =await userModel.findOne({email:req.body.email})
    if(!user){
        return res.status(404).json({
            success: false,
            maaesage: "User not found"
        })
    }
    const match =await bcrypt.compare(req.body.password , user.password)

    
    if(user && match){
        const userData = {email:user.email,phone:user.phone,name:user.name}
        const refreshToken = user.refreshToken
        const expiry = { expiresIn: '30s' }
        const accessToken = jwt.sign(userData, process.env.ACCESS_TOKEN_SECRET || "", expiry)

        return res.json({
            success: true,
            message: 'User Logged In Successfully',
            accessToken: accessToken,
            refreshToken: refreshToken
        })
    }
    return res.json({
            success: false,
            message: 'check email and password',
    })
}
export default login;