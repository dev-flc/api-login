import nodemailer from 'nodemailer'
import { templateSendMail } from './view/send-mail'

export const sendMail = async (
  email: string,
  userName: string,
  token: string
) => {
  const { GMAIL_PASS, GMAIL_USER, GMAIL_HOST, GMAIL_PORT } = process.env
  const transporter = nodemailer.createTransport({
    auth: {
      pass: GMAIL_PASS,
      user: GMAIL_USER
    },
    host: GMAIL_HOST,
    port: Number(GMAIL_PORT),
    secure: true
  })

  const inf = await transporter.sendMail({
    from: '"API LOGIN" <develop.localhost.test@gmail.com',
    html: templateSendMail(userName, token),
    subject: `Bienvenido ${userName}, Favor de confirmar tu cuenta`,
    to: email
  })
  return inf.messageId
}
