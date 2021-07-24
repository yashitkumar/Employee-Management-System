const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

let userScheme = new mongoose.Schema({
  name: String,

  email: String,

  password: {
    type: String,
    select: false,
  },
});

userScheme.plugin(passportLocalMongoose, { usernameField: "email" });
module.exports = mongoose.model("User", userScheme);
