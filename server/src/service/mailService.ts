import nodemailer, { Transporter } from 'nodemailer'
import SMTPTransport from 'nodemailer/lib/smtp-transport'
const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, './../../.env') })

class MailService {
  private transporter: Transporter<SMTPTransport.SentMessageInfo>

  constructor() {
    this.transporter = nodemailer.createTransport({
      host:`${process.env.SMTP_HOST}`,
      port: 587,
      secure: false,
      auth: {
        user:`${process.env.SMTP_USER}`,
        pass:`${process.env.SMTP_PASS}`
      }
    })
  }

  async sendActivationMail(to:string, link:string) {
    await this.transporter.sendMail({
      from: `${process.env.SMTP_USER}`,
      to,
      subject: 'Активация аккаунта на ' + `${process.env.API_URL}`,
      text: '==текст==',
      html:
        `
          <div>
            <h1>Для активации аккаунта перейдите по ссылке</h1>
            <a href="${link}">${link}</a>
          </div>
        `
    }).catch(console.warn)
  }
}

export default new MailService()
