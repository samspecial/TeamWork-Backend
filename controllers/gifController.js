const pool = require('../config')
require('dotenv').config()
const jwt = require('jsonwebtoken');
const upload = require('../middleware/multer-config');
const cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
})
const createGif = (req, res) => {
    let status = {};
    const { title } = req.body;
    upload(req, res, (err) => {
        const file = req.file;
        if (err) {
            return res.send(err)
        } else if (file.mimetype !== 'image/gif') {
            return res.send({
                status: 'Error',
                message: 'Only GIF images allowed'
            })
        }
        cloudinary.uploader.upload(file.path, (error, result) => {
            if (error) return res.send(error)
            const imageurl = result.secure_url;
            const publicid = result.public_id;
            console.log(imageurl, publicid)
            const gifQuery = {
                text: 'INSERT INTO gifs ("imageurl", "title") VALUES($1,$2) RETURNING *',
                values: [imageurl, title]
            };
            pool.query(gifQuery, (error, results) => {
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
        })
    })
}

module.exports = {
    createGif,
}