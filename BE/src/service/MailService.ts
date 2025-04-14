import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

class MailService {
    private transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'gmail', // Use your email service
            auth: {
                user: process.env.EMAIL_USER, // Use environment variables for security
                pass: process.env.EMAIL_PASS
            }
        });
    }

    public sendMail = async (to: string, subject: string, text: string): Promise<void> => {
        const mailOptions = {
            from: process.env.EMAIL_USER, // Sender address
            to, // Recipient address
            subject, // Email subject
            text // Email body
        };

        try {
            await this.transporter.sendMail(mailOptions);
        } catch (error: any) {
            throw new Error('Error sending email: ' + error.message);
        }
    }
}

export default new MailService();