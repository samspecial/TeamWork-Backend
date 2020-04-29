const express = require('express');
const router = express.Router();

const { body } = require('express-validator')

require('dotenv').config();
const adminRoutes = require('../controllers/adminController');


router.post('/auth/create-user', [body('email').isEmail().withMessage('Email not valid'), body('password', 'Password must be alphanumeric').isAlphanumeric().trim(), body('firstName', 'Field can\'t be empty').isLength({ min: 2 }), body('lastName', 'Field can\'t be empty').isLength({ min: 2 }), body('address').isLength({ min: 2 }), body('department').isLength({ min: 2 }),], adminRoutes.createNewUser);

router.post('/auth/signin', [body('email').isEmail().withMessage('Email not valid'), body('password', 'Password must be alphanumeric').isAlphanumeric().trim()], adminRoutes.createLogin)
module.exports = router;