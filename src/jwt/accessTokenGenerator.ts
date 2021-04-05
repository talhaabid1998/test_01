import userModel from '../models/User'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
import {Request,Response} from 'express'

dotenv.config();

const accessToken=(req:Request,res:Response) =>{
    const { email,phone,name} = req.body;
    const formData = {email: email,phone: phone, name: name}
    const accessToken = jwt.sign(formData, process.env.ACCESS_TOKEN_SECRET || "")
    return res.json({
        accessToken: accessToken
    })
        
    
}
export default accessToken;