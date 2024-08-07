import { logError } from '../config/logger.js';

const makeExpressCallback = (controller) => {
  return async (req, res) => {
    const httpRequest = {
      body: req.body,
      file: req.file,
      query: req.query,
      params: req.params,
      userData: req.userData,
      ip: req.ip,
      method: req.method,
      path: req.path,
      source: {
        ip: req.ip,
        browser: req.get('User-Agent'),
      },
      headers: {
        'Content-Type': req.get('Content-Type'),
        Referer: req.get('referer'),
        'User-Agent': req.get('User-Agent'),
      },
    };

    try {
      const httpResponse = await controller(httpRequest);
      if (!httpResponse.body) {
        return res.status(500).json({
          error: 'Returned empty response',
        });
      }
      const { setCookies, accessToken, refreshToken, authToken, exp } = httpResponse;

      if (setCookies) {
        res.cookie('access_token', accessToken, { httpOnly: true });
        res.cookie('refresh_token', refreshToken, { httpOnly: true });
        res.cookie('authToken', authToken, { httpOnly: true });
        res.cookie('exp', exp, { httpOnly: true });
      }

      return res.status(httpResponse.statusCode).json({
        ...httpResponse,
      });
    } catch (err) {
      console.error('Error occurred:', { error: err.message, stack: err.stack });
      logError.error('Error occurred:', { error: err.message, stack: err.stack });
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
};

export default makeExpressCallback;
