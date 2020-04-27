const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
require('dotenv').config();

const articleRoutes = require('../controllers/articleController');
const auth = require('../middleware/auth')

router.post('/articles', [body('title').isLength({ min: 1, max: 200 }).withMessage("Title is required"), body('article').isLength({ min: 1 }).withMessage('Article is required')], auth, articleRoutes.createArticle);
router.patch('/articles/:articleid', [body('title').isLength({ min: 1, max: 200 }).withMessage("Title is required"), body('article').isLength({ min: 1 }).withMessage('Article is required')], auth, articleRoutes.updateArticle);
router.delete('/articles/:articleid', auth, articleRoutes.deleteArticle);
router.post('/articles/:articleid/comments', [body('comment', 'Comment should not be empty').isLength({ min: 1 }).trim()], auth, articleRoutes.commentOnArticle);
router.get('/feed', auth, articleRoutes.feed)


module.exports = router;