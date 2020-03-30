const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const cloudinary = require('cloudinary').v2
require('dotenv').config();
const { createGif } = require('../controllers/gifController')


router.post('/gifs', createGif)


module.exports = router;