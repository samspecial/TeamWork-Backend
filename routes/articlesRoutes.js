const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
require('dotenv').config();

const articleRoutes = require('../controllers/articleController');
const auth = require('../middleware/auth')

router.post('/articles', auth, [check('title').isLength({ min: 1 }).withMessage("Title is required"), check('article').isLength({ min: 1 }).withMessage('Article is required')], articleRoutes.createArticle);
router.patch('/articles/:articleid', auth, [check('title').isLength({ min: 1 }).withMessage("Title is required"), check('article').isLength({ min: 1 }).withMessage('Article is required')], articleRoutes.updateArticle);
router.delete('/articles/:articleid', auth, articleRoutes.deleteArticle);
router.post('/articles/:articleid/comments', auth, articleRoutes.commentOnArticle);
router.get('/feed', auth, articleRoutes.feed)


module.exports = router;