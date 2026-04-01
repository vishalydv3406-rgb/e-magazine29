const express = require('express');
const router = express.Router();
const { getArticles, getArticleById, createArticle, likeArticle, bookmarkArticle, getSavedArticles } = require('../controllers/articleController');
const { protect, authorize } = require('../middleware/auth');

router.route('/')
  .get(getArticles)
  .post(protect, authorize('author', 'admin'), createArticle);

router.route('/saved').get(protect, getSavedArticles);

router.route('/:id').get(getArticleById);
router.route('/:id/like').post(protect, likeArticle);
router.route('/:id/bookmark').post(protect, bookmarkArticle);

module.exports = router;
