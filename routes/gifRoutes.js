const express = require('express');
const router = express.Router();
const { check } = require('express-validator');

require('dotenv').config();

const gifContent = require('../controllers/gifController')


router.post('/gifs', gifContent.createGif)


module.exports = router;