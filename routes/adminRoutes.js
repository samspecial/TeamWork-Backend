const express = require('express');
const router = express.Router();

const { check } = require('express-validator')

require('dotenv').config();
const adminRoutes = require('../controllers/adminController');


router.post('/auth/create-user', [check('firstname').isLength({ min: 3 }).withMessage('Field must be greater than three characters')
], adminRoutes.createNewUser);


module.exports = router;