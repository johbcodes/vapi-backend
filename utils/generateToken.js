import jwt from 'jsonwebtoken';

const generateToken = (payload, secret, expiresIn) => {
  return jwt.sign(payload, secret, { expiresIn });
};

const generateCreateAccountToken = (userInfo) => {
  return generateToken(userInfo, process.env.ACCESS_TOKEN_SECRET, '5m');
};

const generateAccessToken = (userInfo) => {
  return generateToken(userInfo, process.env.ACCESS_TOKEN_SECRET, '5h');
};

const generateRefreshToken = (id) => {
  return generateToken({ id }, process.env.REFRESH_TOKEN_SECRET, '24h');
};

export { generateAccessToken, generateRefreshToken, generateCreateAccountToken };
