const pool = require('../config')
const jwt = require('jsonwebtoken');

const { validationResult } = require('express-validator');

exports.createArticle = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors.array());
        return res.status(422).json({ error: errors.array()[0].msg })
    }
    const { title, article } = req.body;
    const createdon = new Date();
    const articleQuery = 'INSERT INTO articles (title, article, createdon) VALUES ($1,$2, $3) RETURNING *';
    const values = [title, article, createdon]

    pool.query(articleQuery, values, (error, results) => {
        if (error) {
            throw error
        }
        console.log(results.rows)
        res.status(201).json({
            status: "Success",
            data: {
                message: "Article Successfully Created",
                articleid: `${results.rows[0].articleid}`,
                createdOn: `${results.rows[0].createdon}`,
                title: `${title}`
            }
        })
    })
}

