const mongoose = require("mongoose");

const tutorSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Tutor", tutorSchema, "tutor");
