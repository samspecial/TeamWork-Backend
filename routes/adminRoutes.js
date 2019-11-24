const express = require('express');
const router = express.Router();

const { check } = require('express-validator')

require('dotenv').config();
const adminRoutes = require('../controllers/adminController');


router.post('/auth/create-user', [check('firstname').isLength({ min: 3 }).withMessage('Firstname must be greater than three characters'), check('lastname').isLength({ min: 3 }).withMessage('Lastname must be greater than three characters'), check('password').isLength({ min: 8 }).isAlphanumeric().withMessage('Password must be 8 characters minimum').trim(), check('email').isEmail().withMessage('Please enter a valid emmail address').normalizeEmail(), check('address').isLength({ min: 10 }).withMessage('Field must be greater than 10 characters'), check('gender').isLength({ min: 4 }).withMessage('Gender is required'), check('jobrole').isLength({ min: 3 }).withMessage('Field must be greater than three characters'), check('department').isLength({ min: 3 }).withMessage('Field can not be empty')
], adminRoutes.createNewUser);


module.exports = router;