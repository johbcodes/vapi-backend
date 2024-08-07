import sendEmail from '../config/mail.js';
import notificationEvents from '../events/notificationEvents.js';

notificationEvents.on('sendEmail', async ({ to, subject, template, data }) => {
  try {
    const success = await sendEmail(to, subject, template, data);
    if (success) {
      console.log('Email sent successfully');
    } else {
      console.log('Failed to send email');
    }
  } catch (error) {
    console.error('Error sending email:', error);
  }
});
