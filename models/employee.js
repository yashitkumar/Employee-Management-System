const mongoose = require("mongoose");

let employeeScheme = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    uppercase: true,
    trim: true,
    minlength: 3,
    maxlength: 30,
  },
  position: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 25,
  },
  contact: {
    type: Number,
    required: true,
    unique: true,
    min: 1e9,
    max: 1e10 - 1,
  },
  joining_date: {
    type: String,
    required: true,
  },
  salary: {
    type: Number,
    required: true,
    min: 1e2,
  },
});

module.exports = mongoose.model("Employee", employeeScheme);
