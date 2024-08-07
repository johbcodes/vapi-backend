import { BadRequestError, UnauthorizedError } from '../utils/customErrors.js';

export default (err, req, res) => {
  // logger.error(err);
  if (err instanceof BadRequestError || err instanceof UnauthorizedError) {
    return res.status(err.statusCode).json({ error: err.message });
  }

  return res.status(500).json({ error: 'Internal Server Error' });
};
