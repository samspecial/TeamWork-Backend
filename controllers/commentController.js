const pool = require('../config')
const jwt = require('jsonwebtoken');

const createArticleComment = (req, res) => {
    const { comment } = req.body;
    const articleid = parseInt(req.params.articleid);
    const query1 = {
        text: "SELECT * FROM gifs WHERE gifid = $1",
        values: [gifid]
    }
}