import * as dotenv from "dotenv";
dotenv.config({});

import { createTransport } from "nodemailer";
import { emailTemp } from "./emailTemplate.js";


const transporter = createTransport({
  service: process.env.EMAIL_SERVICE,
  auth: {
    user: process.env.SEND_EMAIL,
    pass: process.env.SEND_EMAIL_PASSWORD,
  },
});

export default async function sendEmailSaraha(email,url) {
  const info = await transporter.sendMail({
    from: `"Kasem safwat" <${process.env.SEND_EMAIL}>`,
    to: email,
    subject: "Hello ✔",
    text: "Hello world?",
    html: emailTemp(url),
  });

  console.log("Message sent: %s", info.messageId);
}
