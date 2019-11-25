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

exports.updateArticle = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors.array());
        return res.status(422).json({ error: errors.array()[0].msg })
    }
    const articleid = parseInt(req.params.articleid);
    const { article, title } = req.body;
    const articleQuery = 'UPDATE articles SET title = $1, article = $2 WHERE articleid = $3';
    const values = [title, article, articleid];
    pool.query(articleQuery, values, (error, results) => {
        if (error) {
            res.status(401).json({
                status: "Failed",
                error: "Bad request"
            })
        }
        res.status(201).json({
            status: "Success",
            data: {
                message: "Article Successfully Updated",
                title: `${title}`,
                article: `${article}`
            }
        })
    })
}

exports.deleteArticle = (req, res) => {
    const articleid = parseInt(req.params.articleid);
    const deleteQuery = 'DELETE FROM articles WHERE articleid = $1';
    value = [articleid];

    pool.query(deleteQuery, value, (error, results) => {
        if (error) {
            res.status(403).json({
                status: error,
                message: "Unauthorized"
            })
        }
        res.status(200).json({
            status: "Success",
            data: {
                message: "Article Successsfully Deleted"
            }
        })
    })
}

exports.feed = (req, res) => {
    const feedQuery = 'SELECT a.articleid AS id, a.title, a.article, a.createdon FROM articles a UNION SELECT g.gifid, g.title, g.imageurl, g.createdon FROM gifs g ORDER BY (createdon) DESC'
    pool.query(feedQuery, (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json({
            status: "Success",
            data: results.rows
        })


    }
    )
}