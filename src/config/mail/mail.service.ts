import * as nodemailer from 'nodemailer';
import env from '../environments/env'
export class MailService {

  private mailClient: any;

  constructor() {
    this.mailClient = this.setup();
  }

  private setup = () => {
    return nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465, 
      secure: true, 
      auth: {
        user: 'neider.hamburger@imaginamos.com', 
        pass: env.MAIL_PASSWORD, 
      },
    });
  };

  sendMessage = async (to: string[], subject:string, text: string, html:string): Promise<string> => {
    
    let info = await this.mailClient.sendMail({
      from: '"Neider Hamburger" <neider.hamburger@imaginamos.com>',
      to,
      subject,
      text,
      html
    });

    return info.messageId;
    
  }

  

}
