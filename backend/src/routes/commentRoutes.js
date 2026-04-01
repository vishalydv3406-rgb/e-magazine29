const express = require('express');
const router = express.Router();
const { getCommentsByArticle, addComment } = require('../controllers/commentController');
const { protect } = require('../middleware/auth');

router.route('/article/:articleId').get(getCommentsByArticle);
router.route('/').post(protect, addComment);

module.exports = router;
