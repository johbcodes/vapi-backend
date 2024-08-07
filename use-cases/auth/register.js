import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { getUserRoleId } from '../../utils/functions.js';

export default function makeRegisterUseCase({ usersDb }) {
  const capitalizeFirstLetter = (str) => {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  async function registerUser(req) {
    const { username, firstName, lastName, email, password, phoneNumber } = req.body;

    const userExists = await usersDb.findOne({
      $or: [{ email: email }, { username: username }],
    });

    if (userExists !== null) {
      return {
        statusCode: 422,
        body: {},
        message: 'User with this email or username already exists',
      };
    }

    const salt = await bcrypt.genSalt(10);

    const userRoleId = await getUserRoleId();
    const newUser = await usersDb.insert({
      username,
      firstName: capitalizeFirstLetter(firstName),
      lastName: capitalizeFirstLetter(lastName),
      email,
      password: password,
      phoneNumber,
      roles: userRoleId,
      isStaff: false,
    });

    if (newUser) {
      const data = {
        _id: newUser._id,
        username: newUser.username,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
      };

      const newToken = jwt.sign(
        { userId: newUser._id },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: '1h',
        }
      );

      return {
        setCookies: true,
        statusCode: 200,
        body: {
          user: data,
        },
        authToken: newToken,
        message: 'User created successfully',
      };
    } else {
      return {
        statusCode: 500,
        body: {},
        message: 'Server error occurred',
      };
    }
  }

  return Object.freeze({
    registerUser,
  });
}
