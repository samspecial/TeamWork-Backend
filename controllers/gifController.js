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
    const createdon = new Date();
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
                text: 'INSERT INTO gifs ("imageurl", "publicid","title", "createdon") VALUES($1,$2,$3,$4) RETURNING *',
                values: [imageurl, publicid, title, createdon]
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
                            imageurl,
                            publicid
                        }
                    })
                }
            })
        })
    })
}
const deleteGif = async (req, res) => {
    let status = {}, { gifid } = req.params;
    console.log(gifid)

    const text = 'SELECT * FROM gifs WHERE "gifid" = $1';
    const values = [gifid];

    await pool.query(text, values, async (error, results) => {
        if (error) {
            status = {
                status: "Error",
                message: "Internal Server Error"
            }
            return res.status(500).json(status)
        }
        console.log(results.rows[0])
        const { imageurl, publicid } = results.rows[0]
        await cloudinary.uploader.destroy(publicid, async (error, result) => {
            if (error) {
                status = {
                    status: "Error",
                    message: "Error fetching files"
                }
                return res.status(500).json(status)
            }
            const query2 = {
                text: 'DELETE FROM gifs WHERE gifid = $1',
                values: [gifid]
            };
            await pool.query(query2, (error, results) => {
                if (error) {
                    status = {
                        status: "Error",
                        message: "Internal Server Error"
                    }
                    return res.status(500).json(status)
                } else {
                    status = {
                        status: "Success",
                        message: "GIF image successfully deleted"
                    }
                    res.status(200).json(status)
                }
            })
        })

    })

}
module.exports = {
    createGif, deleteGif
}