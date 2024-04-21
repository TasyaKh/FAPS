import config from "config";
import * as nodemailer from 'nodemailer';

export default class EmailService {
    private readonly HOST: string
    private readonly FROM_EMAIL: string
    private readonly NODE_ENV: string;

    constructor() {
        this.HOST = config.get('SERVER_HOST')
        this.FROM_EMAIL = config.get('DEFAULT_FROM_EMAIL') || '';
        this.NODE_ENV = config.get('NODE_ENV') || 'development';
    }

    async sendPasswordResetEmail(to: string, token: string, firstName?: string) {
        const subject = 'Сбросить пароль';
        const url = `${(this.HOST)}/reset-password/${token}`;

        const htmlEmailContent = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Сброс пароля</title>
        </head>
        <body>
            <h2>Сбросить пароль</h2>
            <p>Привет,</p>
            <p>Вы запросили сброс пароля. Нажмите кнопку ниже, чтобы это сделать:</p>
            <p><a href="${url}" style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: #fff; text-decoration: none; border-radius: 5px;">Сбросить пароль</a></p>
            <p>Если вы этого не запрашивали, проигнорируйте сообщение.</p>
            <p>You have received this email because a request to reset your password was made.</p>
        </body>
        </html>
    `;
        return await this.sendMail(to, subject, htmlEmailContent);
    }

    // to -which email we nedd to send, subject - some title, html - message
   private async sendMail(to: string, subject: string, html: string) {
        const port: number = config.get("SMTP_PORT") ?? 465;
        const transporter = nodemailer.createTransport({
            // service: "gmail",
            host: config.get("SMTP_DOMAIN"),
            port: port,
            secure: port == 465,
            auth: {
                user: config.get("SMTP_USERNAME"),
                pass: config.get("SMTP_PASSWORD"),
            },
        });

        const message = {
            from: `"faps" <${this.FROM_EMAIL}>`,
            to,
            subject,
            html,
        };

        /* if development environment, log the content of email instead of sending actual emails */
        if (this.NODE_ENV === 'development') {
            console.log('Captured email');
            console.log('to: ', to);
            console.log('Subject: ', subject);
            console.log('content: ', html);
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            const previewEmail = require('preview-email');

            previewEmail(message).then(console.log).catch(console.error);
        } else {
            const info = await transporter.sendMail(message);
            console.log('Message sent: %s', info, " envelope ", info.envelope, " response ", info.response);
        }
    }

}
