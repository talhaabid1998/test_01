import sgMail from '@sendgrid/mail';
import userModel from '../models/User'
const user = (req:Request,res:Response)=>{
    const user = userModel.findOne({email:req.body.email})
}

const msg = {
                from: 'talhaabid844@gmail.com',
                to: user,
                subject: 'verify your email',
                text: `Thanks for the registration,
                        please copy and paste the URL given below to verify your account,
                        http://${req.headers.host}verify-email?token-${user.emailToken}`,
                html:
                    `
                        <h1>Hello,</h1>
                        <p1>Thanks for the registration,
                        please copy and paste the URL given below to verify your account</p1>
                        <a href="http://${req.headers.host}verify-email?token-${user.emailToken}">Verify your email</a>
                    `

            }
sgMail.send(msg);
