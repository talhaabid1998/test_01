import userModel from '../models/User'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import {Request,Response} from 'express'
import dotenv from 'dotenv';

import crypto from 'crypto';
// import nodemailer from 'nodemailer';
dotenv.config();

const register =async(req: Request, res: Response) =>{
    const { email,phone,name} = req.body;
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 8);
        const emailTokenCrypto = crypto.randomBytes(64).toString('hex')
        console.log(emailTokenCrypto)
        const formData = {email: email,phone: phone, name: name}
        if(hashedPassword) {
            let user = await userModel.create({
                email,
                password: hashedPassword,
                phone,
                name,
                emailToken: emailTokenCrypto,
            })
            console.log(user)

            
            await user.updateOne({
                $set: {
                    refreshToken: jwt.sign({...formData, _id: user._id},process.env.REFRESH_TOKEN_SECRET || "")
                }
            })
            return res.json({
                success: true,
                message: "User Created Successfully",
                
              })
            
        } 
    } catch (error) {
        console.log(error)
    }
  
}

export default register;
    // bcrypt.hash(req.body.password, 8 , async(function(err, hashedpass){
    //     if(err){
    //         res.json({
    //             error :err
    //         }))
    //     }
       
        // user.save()
        // .then(() => {
        //     res.json({
        //         message: "User added successfuly"
        //     })
        // })
        // .catch(() => {
        //     res.json({
        //         message: 'An error occured'
                
        //     })
        // })
    // })

    
