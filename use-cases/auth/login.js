import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {
  generateAccessToken,
  generateRefreshToken,
} from '../../utils/generateToken.js';

export default function makeLoginUseCase({ usersDb }) {
  async function login(req) {
    const user = await usersDb.findOne(
      { $or: [{ email: req.body.email }, { username: req.body.email }] },
      {
        populate: ['roles', 'permissions'],
      }
    );

    if (!user)
      return {
        statusCode: 401,
        body: {},
        message: 'Invalid Credentials',
      };

    const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);

    if (!isPasswordCorrect) {
      return {
        statusCode: 401,
        body: {},
        message: 'Invalid Credentials, check your email and password',
      };
    }

    const accessToken = generateAccessToken({
      id: user._id,
      username: user.username,
      email: user.email,
    });

    const refreshToken = generateRefreshToken(user._id);

    const data = {
      id: user._id,
      username: user.username,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNumber: user.phoneNumber,
      role: user.roles.name,
      isVerified: user.isVerified,
      permissions: user.permissions.map((perm) => perm.name),
    };

    return {
      setCookies: true,
      statusCode: 200,
      body: {
        user: data,
      },
      message: 'Login successfully',
      accessToken,
      refreshToken,
      exp: Math.floor(Date.now() / 1000) + 60 * 60,
    };
  }

  async function tokenRefresh(req) {
    const { refreshToken } = req.body;

    try {
      if (!refreshToken) {
        return {
          statusCode: 400,
          body: { message: 'Refresh token is required' },
        };
      }

      const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
      const user = await usersDb.findOne({ _id: decoded.id });

      if (!user) {
        return {
          statusCode: 401,
          body: { message: 'Invalid user for token refresh' },
        };
      }

      const newAccessToken = generateAccessToken({
        id: user._id,
        username: user.username,
        email: user.email,
      });
      const newRefreshToken = generateRefreshToken(user._id);

      return {
        setCookies: true,
        statusCode: 200,
        body: {
          message: 'Token refresh successful',
          accessToken: newAccessToken,
          refreshToken: newRefreshToken,
          exp: Math.floor(Date.now() / 1000) + 60 * 60,
        },
      };
    } catch (error) {
      console.error('Unauthorized malformed Token: ', error);
      return {
        statusCode: 403,
        body: { message: 'Unauthorized malformed Token' },
      };
    }
  }

  async function forgotPassword(req) {
    const { email } = req.body;
    const user = await usersDb.findOne({ email: email });
    if (!user) {
      return {
        statusCode: 200,
        body: {},
        message: 'If an account with that email exists, you will receive an email with password reset instructions',
      };
    }

    const token = crypto.randomBytes(20).toString('hex');
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    await usersDb.update(
      { email: email },
      {
        resetPasswordToken: hashedToken,
        resetPasswordExpires: Date.now() + 300000,
      }
    );
    const url = `${process.env.BASE_URL}/auth-password?token=${encodeURIComponent(
      token
    )}&email=${encodeURIComponent(email)}`;

    const config = {
      to: email,
      subject: 'Password reset request',
      template: `./templates/welcome-user.ejs`,
      data: { name: user.firstName + ' ' + user.lastName, url: url },
    };

    notificationEvents.emit('sendEmail', { ...config });

    return {
      statusCode: 200,
      body: {},
      message: 'If an account with that email exists, you will receive an email with password reset instructions',
    };
  }

  async function resetPassword(req) {
    const { email, resetPasswordToken, newPassword } = req.body;

    const hashedToken = crypto.createHash('sha256').update(resetPasswordToken).digest('hex');

    const user = await usersDb.findOne({
      email,
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return {
        statusCode: 400,
        body: {},
        message: 'Token invalid or user not found',
      };
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    await usersDb.update(
      { _id: user._id },
      {
        $set: {
          password: hashedPassword,
          resetPasswordToken: undefined,
          resetPasswordExpires: undefined,
        },
      }
    );

    return {
      statusCode: 200,
      body: {},
      message: 'Password Reset Successfully',
    };
  }

  return Object.freeze({
    login,
    tokenRefresh,
    forgotPassword,
    resetPassword,
  });
}
