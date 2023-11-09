const bcrypt = require("bcrypt");
const UserDBModel = require("../models/user-model");
//const users = require("../data/demo/users.js");
const users = require("../data/demo/users");
//const { createHmac } = require("node:crypto");
//const { scrypt } = require("node:crypto");
const tokenService = require("./token-service");
const UserDto = require("../dtos/user-dto");
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
}

module.exports = new UserService();
