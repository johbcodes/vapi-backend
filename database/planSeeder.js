import { randomUUID } from 'crypto';
import { logError } from '../config/logger.js';
import { Plan } from '../models/index.js';
const plans = [
  {
    name: 'Basic Plan',
    price: 10, // Price in dollars
    description: 'Basic plan with 100 minutes of calls per month and 1 phone number.',
    features: [
      '100 minutes of calls',
      '1 phone number',
      'Basic support',
    ],
    limits: {
      max_monthly_minutes: 100,
      max_phone_numbers: 1,
    },
    stripePlanId: randomUUID(),
  },
  {
    name: 'Standard Plan',
    price: 30, // Price in dollars
    description: 'Standard plan with 400 minutes of calls per month and 2 phone numbers.',
    features: [
      '400 minutes of calls',
      '2 phone numbers',
      'Priority support',
      'Email and SMS notifications',
      'Weekly performance report',
    ],
    limits: {
      max_monthly_minutes: 400,
      max_phone_numbers: 2,
    },
    stripePlanId: randomUUID(),
  },
  {
    name: 'Premium Plan',
    price: 70, // Price in dollars
    description: 'Premium plan with 1000 minutes of calls per month and 5 phone numbers.',
    features: [
      '1000 minutes of calls',
      '5 phone numbers',
      'Priority support',
      'Email and SMS notifications',
      'Dedicated account manager',
      'Monthly performance report',
      'Access to premium resources',
    ],
    limits: {
      max_monthly_minutes: 1000,
      max_phone_numbers: 5,
    },
    stripePlanId: randomUUID(),
  },
];
export const seedPlans = async () => {
  try {
    await Plan.insertMany(plans);

    console.log('PLans seeded successfully!');
  } catch (error) {
    console.error('Error:', { error: error.message, stack: error.stack });
    logError.error('Error:', { error: error.message, stack: error.stack });
  }
};
