import notificationEvents from '../events/notificationEvents.js';
import { sendSmsApiUseCase } from '../use-cases/services/index.js';

notificationEvents.on('sendSMS', async ({ message, phoneNumber }) => {
  try {
    const success = await sendSmsApiUseCase(message, phoneNumber);
    if (success) {
      console.log('SMS sent successfully');
      return true;
    } else {
      console.log('Failed to send SMS');
      return false;
    }
  } catch (error) {
    console.error('Error sending SMS:', error);
    return false;
  }
});
