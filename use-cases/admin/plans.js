import { logError } from '../../config/logger.js';

export default function makePlanUseCase({ planDb }) {
  async function createPlan(req) {
    try {
      const { name, price, description, features, max_monthly_leads } = req.body;

      const foundPlan = await planDb.findOne({ name: name });
      if (foundPlan) {
        return {
          statusCode: 400,
          body: {},
          message: 'Plan with that name already exists',
        };
      }

      const plan = await planDb.insert({
        name,
        price,
        description,
        features,
        max_monthly_leads,
      });

      return {
        statusCode: 201,
        body: plan,
        message: 'Plan created successfully',
      };
    } catch (error) {
      console.error('Failed to create pla: ', error);
      logError.error('Failed to create pla: ', {
        error: error.message,
        stack: error.stack,
      });
      return {
        statusCode: 500,
        body: {},
        message: 'Failed to create plan',
      };
    }
  }

  async function getAllPlans() {
    try {
      const plans = await planDb.find();
      return {
        statusCode: 200,
        body: { plans: plans },
      };
    } catch (error) {
      console.error('Error retrieving plans:: ', error);
      logError.error('Error retrieving plans:: ', {
        error: error.message,
        stack: error.stack,
      });
      return {
        statusCode: 500,
        body: {},
        message: 'Failed to retrieve plans',
      };
    }
  }

  async function getPlanById(req) {
    const planId = req.params.id;

    try {
      const plan = await planDb.findById(planId);
      if (!plan) {
        return {
          statusCode: 404,
          message: 'Plan not found',
        };
      }
      return {
        statusCode: 200,
        data: plan,
      };
    } catch (error) {
      console.error('Error retrieving plans:: ', error);
      logError.error('Error retrieving plans:: ', {
        error: error.message,
        stack: error.stack,
      });
      return {
        statusCode: 500,
        message: 'Failed to retrieve plan',
      };
    }
  }

  async function updatePlan(req) {
    const planId = req.params.id;

    try {
      const updatedPlan = await planDb.update({ _id: planId }, req.body);

      if (!updatedPlan) {
        return {
          statusCode: 404,
          message: 'Plan not found',
        };
      }

      return {
        statusCode: 200,
        body: updatedPlan,
        message: 'Plan updated successfully',
      };
    } catch (error) {
      console.error('Error udpating plans:: ', error);
      logError.error('Error udpating plans:: ', {
        error: error.message,
        stack: error.stack,
      });
      return {
        statusCode: 500,
        body: {},
        message: 'Failed to update plan',
      };
    }
  }

  async function deletePlan(req) {
    const planId = req.params.id;

    try {
      const deletedPlan = await planDb.destroy(planId);

      if (!deletedPlan) {
        return {
          statusCode: 404,
          body: {},
          message: 'Plan not found',
        };
      }

      return {
        statusCode: 200,
        body: deletedPlan,
        message: 'Plan deleted successfully',
      };
    } catch (error) {
      console.error('Error deleting plans:: ', error);
      logError.error('Error deleting plans:: ', {
        error: error.message,
        stack: error.stack,
      });
      return {
        statusCode: 500,
        message: 'Failed to delete plan',
      };
    }
  }

  return Object.freeze({
    createPlan,
    getAllPlans,
    getPlanById,
    updatePlan,
    deletePlan,
  });
}
