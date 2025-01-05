import nodemailer from 'nodemailer'
import { forgotPasswordEmailHtml } from '../emailTemplate/forgotPasswordEmailHtml.config';

const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
      user: 'lamont.welch4@ethereal.email',
      pass: 'uthCEQt9HEQrvQjRuw'
  }
  });

  export default async function forgotPasswordEmailSend({name, email, otp}: {name: string, email: string, otp: string}) {
    const info = await transporter.sendMail({
      from: '"Avinash Kumar Singh 👻" <noreply@gmail.com>', // sender address
      to: email, // list of receivers
      subject: "Reset your password", // Subject line
      html: forgotPasswordEmailHtml.replace('12345',otp).replace(`{userName}`,name), // html body
    });
    }
  