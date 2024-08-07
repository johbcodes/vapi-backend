import { logError } from '../config/logger.js';

export default function makeSubscriptionUseCase({ subscriptionDb }) {
  async function createSubscription(req) {
    try {
      const { user, plan_id, status = 'active' } = req.body;

      const startDate = new Date();

      const endDate = new Date(startDate);
      endDate.setDate(startDate.getDate() + 30);

      const subscription = await new subscriptionDb.insert({
        user,
        plan_id,
        status,
        startDate,
        endDate,
      });

      return {
        statusCode: 201,
        body: { subscription },
        body: subscription,
      };
    } catch (error) {
      console.error('Error creating subscription: ', error);
      logError.error('Error creating subscription: ', {
        error: error.message,
        stack: error.stack,
      });
      return {
        statusCode: 500,
        body: {},
        message: 'Failed to create subscription',
      };
    }
  }

  async function getAllSubscriptions() {
    try {
      const subscriptions = await subscriptionDb.find(
        {},
        { populate: ['user', 'plan_id'] }
      );
      return {
        statusCode: 200,
        body: { subscriptions },
        message: 'fetched subscriptions',
      };
    } catch (error) {
      console.error('Failed to retrieve subscriptions: ', error);
      logError.error('Failed to retrieve subscriptions: ', {
        error: error.message,
        stack: error.stack,
      });
      return {
        statusCode: 500,
        body: {},
        message: 'Failed to retrieve subscriptions',
      };
    }
  }

  async function getSubscriptionById(req) {
    const subscriptionId = req.params.id;

    try {
      const subscription = await subscriptionDb.findOne({ _id: subscriptionId });
      if (!subscription) {
        return {
          statusCode: 404,
          body: {},
          message: 'Subscription not found',
        };
      }
      return {
        statusCode: 200,
        body: subscription,
        message: 'fetch subscriptipn success',
      };
    } catch (error) {
      console.error('Error retrieving subscription by ID: ', error);
      logError.error('Error retrieving subscription by ID: ', {
        error: error.message,
        stack: error.stack,
      });
      return {
        statusCode: 500,
        body: {},
        message: 'Failed to retrieve subscription',
      };
    }
  }

  async function updateSubscription(req) {
    const subscriptionId = req.params.id;
    const { user_id, plan_id, status, startDate, endDate } = req.body;

    try {
      const subscription = await subscriptionDb.findOne({ _id: subscriptionId });

      if (!subscription) {
        return {
          statusCode: 404,
          body: {},
          message: 'Subscription not found',
        };
      }
      const updatedSubscription = await subscriptionDb.update(
        { _id: subscriptionId },
        {
          user_id: user_id,
          plan_id: plan_id,
          status: status,
          startDate: startDate,
          endDate: endDate,
        }
      );
      return {
        statusCode: 200,
        body: { updatedSubscription },
        message: 'Updated success',
      };
    } catch (error) {
      console.error('Error updating subscription:', error);
      logError.error('Error updating subscription: ', {
        error: error.message,
        stack: error.stack,
      });
      return {
        statusCode: 500,
        body: {},
        message: 'Failed to update subscription',
      };
    }
  }

  async function deleteSubscription(req) {
    const subscriptionId = req.params.id;

    try {
      const subscription = await subscriptionDb.findOne({ _id: subscriptionId });

      if (!subscription) {
        return {
          statusCode: 404,
          body: {},
          message: 'Subscription not found',
        };
      }

      const deletedSubscription = await subscriptionDb.destroy({ _id: subscriptionId });

      return {
        statusCode: 200,
        body: { deletedSubscription },
        message: 'Subscription deleted successfully',
      };
    } catch (error) {
      console.error('Error deleting subscription:', error);
      logError.error('Error deleting subscription: ', {
        error: error.message,
        stack: error.stack,
      });
      return {
        statusCode: 500,
        message: 'Failed to delete subscription',
      };
    }
  }

  return Object.freeze({
    createSubscription,
    getAllSubscriptions,
    getSubscriptionById,
    updateSubscription,
    deleteSubscription,
  });
}
