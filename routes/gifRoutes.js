const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const cloudinary = require('cloudinary').v2
require('dotenv').config();
const auth = require('../middleware/auth')
const { createGif, deleteGif, commentOnGif } = require('../controllers/gifController')


router.post('/gifs', auth, createGif)
router.delete('/gifs/:gifid', auth, deleteGif)
router.post('/gifs/:gifid/comments', auth, commentOnGif)

module.exports = router;