const pool = require('../config')
require('dotenv').config()
const jwt = require('jsonwebtoken');
const cloudinary = require('cloudinary').v2

const { validationResult } = require('express-validator');

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
})

const createGif = async (req, res) => {
    let status = {};
    const { title } = req.body;
    const file = req.files.gif;


    if (file.mimetype !== 'image/gif') {
        return res.status(403).json({
            status: "Error",
            error: "Please upload a GIF file"
        })
    }
    const gifUrl = cloudinary.uploader.upload(file.tempFilePath, (error, result) => {
        if (error) {
            return res.status(400).json({
                status: "error",
                error: "Please upload a GIF file"
            })

        }
        return result;
    })
    const imageurl = gifUrl.secure_url;
    const publicid = gifUrl.public_id;

    const gifQuery = {
        text: 'INSERT INTO gifs ("title", "imageurl","gifid") VALUES($1,$2, $3) RETURNING *',
        values: [title, imageurl, gifidd]
    };
    await pool.query(gifQuery, (error, results) => {
        if (error) {
            res.status(500).json({
                error: "error",
                error: "Internal server error"
            })
        } else {
            const { gifid, createdon } = results.rows[0]
            res.status(200).json({
                status: "Success",
                data: {
                    gifid,
                    message: "GIF image successfully posted",
                    createdon,
                    title,
                    imageurl
                }
            })
        }
    })


}

module.exports = {
    createGif,
}