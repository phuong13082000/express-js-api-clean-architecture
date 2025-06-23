import {Resend} from 'resend';
import {config} from 'dotenv'

config()

if (!process.env.RESEND_API) {
    console.log("Provide RESEND_API in side the .env file")
}

const resend = new Resend(process.env.RESEND_API);

const sendEmail = async ({sendTo, subject, html}) => {
    try {
        const {data, error} = await resend.emails.send({
            from: 'test<noreply@example.com>',
            to: sendTo,
            subject: subject,
            html: html,
        });

        if (error) {
            return console.error({error});
        }

        return data
    } catch (error) {
        console.log(error)
    }
}

export default sendEmail

