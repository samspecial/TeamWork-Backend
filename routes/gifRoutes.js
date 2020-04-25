const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const cloudinary = require('cloudinary').v2
require('dotenv').config();
const auth = require('../middleware/auth')
const { createGif, deleteGif, commentOnGif } = require('../controllers/gifController')


router.post('/gifs', [body('title', 'Title field can\'t be blank').isLength({ min: 1, max: 200 })], auth, createGif)
router.delete('/gifs/:gifid', auth, deleteGif)
router.post('/gifs/:gifid/comments', [body('comment', 'Comment field can\'t be blank').isLength({ min: 1, max: 200 })], auth, commentOnGif)

module.exports = router;