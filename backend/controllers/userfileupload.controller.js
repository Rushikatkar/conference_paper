// controllers/UserController.js

const Userfileupload = require('../models/userfileupload.model');
const fs = require('fs');

const createUser = async (req, res) => {
  try {
      const { full_name, email, contact_number, affiliation } = req.body;
      const newUser = new Userfileupload({ full_name, email, contact_number, affiliation });

      if (req.file) {
          const { originalname } = req.file; // Get the original filename from req.file
          const fileData = fs.readFileSync(req.file.path);
          newUser.word_file.data = fileData;
          newUser.word_file.contentType = req.file.mimetype;
          newUser.word_file.originalname = originalname; // Save original filename
          fs.unlinkSync(req.file.path);
      }

      await newUser.save();
      res.status(201).json({ status: true, message: 'You are registered successfully' });
  } catch (err) {
      res.status(500).json({ status: false, error: err.message });
  }
};


  const getAllUsers = async (req, res) => {
    try {
        // Fetch all users from the database
        const users = await Userfileupload.find();

        // Return the users as JSON response
        res.status(200).json({ status: true, data: users });
    } catch (err) {
        // Handle errors if any occur
        res.status(500).json({ status: false, error: err.message });
    }
};

module.exports = { createUser, getAllUsers };
