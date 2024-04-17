
const express = require('express');
const router = express.Router();
const upload = require('../middlewares/multerMiddleware');
const { createUser , getAllUsers} = require('../controllers/userfileupload.controller');
const requireAuth= require('../middlewares/requireAuth');

router.post('/create', upload.single('word_file'), createUser);


// router.use(requireAuth)

router.get('/getallfiles',requireAuth, getAllUsers);

module.exports = router;
