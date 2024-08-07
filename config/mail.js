import nodemailer from 'nodemailer';

import ejs from 'ejs';

console.log('node_mailer_user:', process.env.node_mailer_user);
console.log('node_mailer_pass:', process.env.node_mailer_pass);

export const transporter = nodemailer.createTransport({
  host: 'mail.muiaa.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.node_mailer_user,
    pass: process.env.node_mailer_pass,
  },
});

async function sendEmail(to, subject, template, data) {
  try {
    const html = await ejs.renderFile(template, data);
    const info = await transporter.sendMail({
      from: `"Muiaa Pesa Support" <${process.env.node_mailer_user}>`,
      to: to,
      subject: subject,
      html: html,
    });
    console.log('Email sent:', info.response);
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
}

export default sendEmail;
