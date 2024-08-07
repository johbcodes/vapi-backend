import { DashboardIndexUseCase } from '../use-cases/index.js';

export default Object.freeze({
  index: (httpRequest) => DashboardIndexUseCase(httpRequest),
});
