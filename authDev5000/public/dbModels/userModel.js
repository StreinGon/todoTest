var mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Users = new Schema({
  username: String,
  mail: String,
  password: String,
  role: { type: Schema.ObjectId, ref: "Roles" },
  todos: [{ type: Schema.ObjectId, ref: "Todos" }]
});

const UsersModel = mongoose.model("Users", Users, "users");
module.exports = UsersModel;
