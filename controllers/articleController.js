const pool = require('../config')
const jwt = require('jsonwebtoken');

const { validationResult } = require('express-validator');

exports.createArticle = async (req, res) => {
    const { title, article } = req.body;
    const createdon = new Date();
    let id = req.userId;
    const authorid = id
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ error: errors.array()[0].msg })
    }
    const articleQuery = 'INSERT INTO articles (title, article, createdon,authorid) VALUES ($1,$2, $3, $4) RETURNING *';
    const values = [title, article, createdon, authorid]

    await pool.query(articleQuery, values, (error, results) => {
        if (error) {
            throw error
        }
        const { articleid, createdon, title, article, authorid } = results.rows[0]
        res.status(201).json({
            status: "Success",
            data: {
                message: "Article Successfully Created",
                articleid: articleid,
                createdOn: createdon,
                title: title,
                article: article,
                id: authorid
            }
        })
    })
}

exports.updateArticle = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
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
    const value = [articleid];

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

exports.commentOnArticle = async (req, res) => {
    let status = {}, { comment } = req.body, gifid = parseInt(req.params.gifid);
    let id = req.userId;
    const authorid = id
    const createdon = new Date()
    const query1 = {
        text: 'SELECT * FROM gifs WHERE "gifid" = $1',
        values: [gifid]
    };
    await pool.query(query1, async (error, result) => {
        if (error) {
            status = {
                status: "Error",
                message: "Internal server error"
            }
            res.status(500).json(status)
        } else if (result.rows.length === 0) {
            status = {
                status: "Error",
                message: "GIF doesnot exist"
            }
            res.status(404).json(status);
        } else {
            const query2 = {
                text: 'INSERT INTO comments ("comment","gifid","createdon", "authorid") VALUES ($1,$2,$3, $4) RETURNING *',
                values: [comment, gifid, createdon, authorid]
            }
            await pool.query(query2, (error, results) => {
                if (error) {
                    status = {
                        status: "Error",
                        message: "Internal server error"
                    }
                    res.status(500).json(status);
                } else {
                    const { commentid, gifid, createdon, comment, title } = results.rows[0]
                    status = {
                        status: "Success",
                        message: "Comment Successfuly created",
                        createdon,
                        gifTitle: title,
                        comment,
                        commentId: commentid
                    }
                    res.status(200).json(status);
                }
            })
        }
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