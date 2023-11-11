const bcrypt = require("bcrypt");
const UserDBModel = require("../models/user-model");
const users = require("../data/demo/users");
const tokenService = require("./token-service");
const UserDto = require("../dtos/user-dto");
const errorMiddleware = require("../middlewares/error-middleware");
const ApiError = require("../exceptions/api-error");
require("dotenv").config();
class UserService {
  /***********************************************
   * Fill database users if collection is empty
   **/
  async fillUsers() {
    const result = await UserDBModel.findOne({}).exec();
    if (!result) {
      await users.map(async (inUser) => {
        const hashPassword = await bcrypt.hash(inUser.password, 3);
        const user = await UserDBModel.create({
          login: inUser.login,
          password: hashPassword,
          allowedTests: inUser.allowedTests,
        });
        user.save();
        const userDto = new UserDto(user);
        const tokens = await tokenService.generateTokens({ ...userDto });
        await tokenService.saveToken(userDto.id, tokens.refreshToken);
        return { ...tokens, user: userDto };
      });
    }
  }

  async login(login, password) {
    const user = await UserDBModel.findOne({ login }).exec();
    if (!user) {
      throw ApiError.BadRequest("User don't find with this login");
    }
    const isPassEquals = await bcrypt.compare(password, user.password);
    if (!isPassEquals) {
      throw ApiError.BadRequest("Password is incorrect");
    }
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    return { ...tokens, user: userDto };
  }

  async logout(refreshToken) {
    const token = await tokenService.removeToken(refreshToken);
    return token;
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError();
    }
    const userData = tokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = await tokenService.findToken(refreshToken);
    if (!userData || !tokenFromDb) {
      throw ApiError.UnauthorizedError();
    }
    const user = await userModel.findById(userData.id);
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    return { ...tokens, user: userDto };
  }

  async getListAllowedTests() {}
}

module.exports = new UserService();
