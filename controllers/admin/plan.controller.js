import {
  createPlanUseCase,
  deletePlanUseCase,
  getAllPlansUseCase,
  getPlanByIdUseCase,
  updatePlanUseCase,
} from '../../use-cases/admin/index.js';

export default Object.freeze({
  createPlan: (httpRequest) => createPlanUseCase(httpRequest),
  getAllPlans: (httpRequest) => getAllPlansUseCase(httpRequest),
  getPlanById: (httpRequest) => getPlanByIdUseCase(httpRequest),
  updatePlan: (httpRequest) => updatePlanUseCase(httpRequest),
  deletePlan: (httpRequest) => deletePlanUseCase(httpRequest),
});
