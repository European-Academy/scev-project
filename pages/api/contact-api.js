// https://www.npmjs.com/package/zeptomail

// For ES6
import { SendMailClient } from "zeptomail";

const url = process.env.ZEPTO_URL;
const token = process.env.ZEPTO_TOKEN;

export default function handler(req, res) {
    try {
        const { name, email, subject, message } = req.body
        const client = new SendMailClient({ url, token })

        const wrap_msg = `
        <div style="padding-bottom:10px;"><b>Name<b>: ${name}</div>
        <div style="padding-bottom:10px;"><b>Email<b>: ${email}</div>
        <div style="padding-bottom:10px;"><b>Message<b>: ${message}</div>
        `

        client.sendMail({
            "bounce_address": "noreply@mail.scientificevents.eu",
            "from":
            {
                "address": "noreply@scientificevents.eu",
                "name": "noreply@scientificevents.eu"
            },
            "to":
                [
                    {
                        "email_address":
                        {
                            "address": "info@scientificevents.eu",
                            "name": "Scientific Events"
                        }
                    }
                ],
            "subject": subject,
            "htmlbody": wrap_msg,
        })
        res.json({ status: 'ok' })
    } catch (err) {
        console.error(err)
        res.status(500).json({ status: 'error', message: 'Unexpected error' })
    }
}