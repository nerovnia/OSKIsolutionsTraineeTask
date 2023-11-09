const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
  login: { type: String, required: true },
  password: { type: String, required: true },
  allowedTests: [{ type: String, required: true }],
  completedTests: [{ type: String }],
});

module.exports = model("User", UserSchema);
