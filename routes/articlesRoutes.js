const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
require('dotenv').config();

const articleRoutes = require('../controllers/articleController');
const auth = require('../middleware/auth')

router.post('/articles', auth, [check('title').isLength({ min: 1 }).withMessage("Title is required"), check('article').isLength({ min: 1 }).withMessage('Article is required')], articleRoutes.createArticle);

module.exports = router;