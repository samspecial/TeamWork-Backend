const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const pool = require('../config');
const { validationResult } = require('express-validator')

exports.createNewUser = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors.array());
        return res.status(422).json({ error: errors.array() })
    }
    let { email } = req.body;

    pool.query('SELECT * FROM users WHERE email = $1', [email], (error, results) => {
        if (results.rows[0].email === email) {
            return res.status(401).json({
                error: "Email Address already exist"
            })

        }

    })
    bcrypt.hash(req.body.password, 10).then(hash => {
        const { lastname, email, password, firstname, jobrole, address, gender, department } = req.body;
        const createdon = new Date();
        const createUser = 'INSERT INTO users (lastname, firstname, address, jobrole, gender, email, department, createdon, hash) VALUES ($1,$2, $3, $4, $5, $6, $7, $8, $9) RETURNING *'
        const values = [lastname, firstname, address, jobrole, gender, email, department, createdon, hash]
        pool.query(createUser, values, (error, results) => {
            if (error) {
                res.status(403).json({
                    status: "Error",
                    error: "Account creation not successful"
                })
            }
            res.status(201).json({
                status: "Success",
                data: {
                    message: "Account Successfully Created",
                    token: "token",
                    userId: `${results.rows[0].id}`
                }
            })
        })
    }).catch(error => {
        error: new Error;
    })
}

exports.createLogin = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors.array());
        return res.status(422).json({ error: errors.array()[0].msg })
    }
    const { email, password } = req.body;

    pool.query('SELECT hash FROM users WHERE email = $1', [email], (error, results) => {
        if (error) {
            res.status(401).json({
                status: "Error",
                message: "Error getting user"
            })
        }

        bcrypt.compare(password, results.rows[0].hash).then(valid => {
            if (valid) {

                return pool.query('SELECT * FROM users', (error, results) => {
                    const token = jwt.sign({ userId: results.rows[0].id },
                        process.env.TOKEN_SECRET,
                        { expiresIn: '6h' }
                    )

                    res.status(200).json({
                        status: "Signin Successful",
                        data: {
                            token: token,
                            userId: results.rows[0].id
                        }
                    })
                })

            } else {
                res.status(404).json({
                    status: "Error",
                    message: "Password Mismatch"
                })
            }
        }).catch(err => {
            res.status(500).json({
                status: "Error",
                message: "Wrong Credentials"
            })
        })


    })
}

