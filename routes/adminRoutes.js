const express = require('express');
const router = express.Router();

const { check } = require('express-validator')

require('dotenv').config();
const adminRoutes = require('../controllers/adminController');


router.post('/create-user', check('email').isEmail().withMessage('Firstname must be greater than three characters'), adminRoutes.createNewUser);

router.post('/signin', adminRoutes.createLogin)
module.exports = router;