const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
// const sendGridTransport = require('nodemailer-sendgrid-transport')

const pool = require('../config');
const { validationResult } = require('express-validator')

// const transporter = nodemailer.createTransport(sendGridTransport({
//     auth: {
//         api_key: process.env.SEND_EMAIL
//     }
// }))
exports.createNewUser = (req, res, next) => {
    let status = {};
    const {
        firstName,
        lastName,
        email,
        password,
        gender,
        jobRole,
        department,
        address,
    } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        let ans = []
        for (let i = 0; i < errors.array().length; i++) {
            ans.push(errors.array()[i].msg)
        }
        return res.status(422).json({ error: ans })
    }
    const sqlQuery1 = {
        text: 'SELECT * FROM users WHERE email = $1',
        values: [email],
    };
    pool.query(sqlQuery1, (error, results) => {
        if (error) {
            status = {
                status: "Error",
                error: "Internal Server Error"
            }
            return res.status(500).json(status)
        } else if (results.rows.length > 0) {
            status = {
                status: "Error",
                error: "User Already Exist"
            }
            return res.status(401).json(status)
        } else {
            bcrypt.hash(req.body.password, 10).then(hash => {
                const createdon = new Date();
                const createUser = 'INSERT INTO users ("lastname", "firstname", "address", "jobrole", "gender", "email", "department", "createdon", "hash") VALUES ($1,$2, $3, $4, $5, $6, $7, $8, $9) RETURNING *'
                const values = [lastName, firstName, address, jobRole, gender, email, department, createdon, hash]
                pool.query(createUser, values, (error, results) => {
                    if (error) {
                        status = {
                            status: "Error",
                            error: "Account creation not successful"
                        }
                        res.status(401).json(status)
                    } else {
                        const { email, firstName, id } = results.rows[0];
                        status = {
                            status: "Success",
                            data: {
                                message: "Account Successfully Created",
                                userId: id
                            }
                        }
                        res.status(200).json(status)
                        // return transporter.sendMail({
                        //     to: email,
                        //     from: 'admin@teamwork.com',
                        //     subject: 'Signup Successfully',
                        //     html: `<p>Hello ${firstName}, We are excited to have you signed up for our service. We hope you have a smooth ride and fun here`
                        // }).catch(err => {
                        //     console.log(err);
                        // })

                    }
                })
            }).catch(error => {
                error: new Error;
            })
        }
    })

}
exports.createLogin = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ error: errors.array()[0].msg })
    }
    const { email, password } = req.body;
    pool.query('SELECT hash FROM users WHERE email = $1', [email], (error, results) => {
        if (error) {
            status = {
                status: "Error",
                message: "Internal Server Error"
            }
            res.status(500).json(status);
        } else {
            const { id, hash } = results.rows[0]
            bcrypt.compare(password, hash).then(valid => {
                if (valid) {
                    pool.query('SELECT * FROM users', (error, results) => {
                        const { id } = results.rows[0]
                        const token = jwt.sign({ userId: id },
                            process.env.TOKEN_SECRET,
                            { expiresIn: '6h' }
                        )
                        status = {
                            status: "Signin Successful",
                            data: {
                                token: token,
                                userId: id
                            }
                        }
                        res.status(200).json(status)
                    })
                } else {
                    status = {
                        error: "Error",
                        message: "Password Mismatch"
                    }
                    res.status(404).json(status)
                }
            }).catch(err => {
                status = {
                    status: "Error",
                    message: "Wrong Credentials"
                }
                res.status(500).json(status)
            })
        }
    })
}

