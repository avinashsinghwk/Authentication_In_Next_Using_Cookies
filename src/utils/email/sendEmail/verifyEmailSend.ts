import nodemailer from 'nodemailer'
import { verifyEmailHtml } from '../emailTemplate/verifyEmailHtml.config';

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'dylan.koelpin30@ethereal.email',
        pass: 'zyTHeateH93gpkhVwy'
    }
  });

  export default async function verifyEmailSend({name, email, otp}: {name: string, email: string, otp: string}) {
    const info = await transporter.sendMail({
      from: '"Avinash Kumar Singh 👻" <noreply@gmail.com>', // sender address
      to: email, // list of receivers
      subject: "Verify your email", // Subject line
      html: verifyEmailHtml.replace('12345',otp).replace(`{userName}`,name), // html body
    });
    }
  