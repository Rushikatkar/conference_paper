// models/User.js

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  full_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  contact_number: {
    type: String,
    required: true,
  },
  affiliation: String,
  word_file: {
    data: Buffer, // Add a field to store file data as a buffer
    contentType: String, // Add a field to store file content type
    originalname: String,
  },
});

const Userfileupload = mongoose.model('User', userSchema);

module.exports = Userfileupload;
