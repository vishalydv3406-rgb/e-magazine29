const Article = require('../models/Article');
const User = require('../models/User');

const getArticles = async (req, res) => {
  try {
    const { category, search, page = 1, limit = 10, magazineId } = req.query;
    let filter = { status: 'published' };
    
    if (search) {
      filter.$text = { $search: search };
    }
    if (magazineId) {
      filter.magazineId = magazineId;
    }

    const articles = await Article.find(filter)
      .populate('magazineId')
      .populate('authorId', 'name avatar')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort(search ? { score: { $meta: 'textScore' } } : { createdAt: -1 });

    const count = await Article.countDocuments(filter);
    
    res.json({
      articles,
      totalPages: Math.ceil(count / limit),
      currentPage: Number(page)
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getArticleById = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id)
      .populate('magazineId')
      .populate('authorId', 'name avatar');
      
    if (article) {
      // Increment views
      article.views += 1;
      await article.save();
      res.json(article);
    } else {
      res.status(404).json({ message: 'Article not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createArticle = async (req, res) => {
  try {
    const { title, content, magazineId, readingTime, status, isPremium } = req.body;
    const article = await Article.create({
      title, content, magazineId, authorId: req.user._id, readingTime, status, isPremium
    });
    res.status(201).json(article);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const likeArticle = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) return res.status(404).json({ message: 'Article not found' });
    
    if (article.likes.includes(req.user._id)) {
      article.likes.pull(req.user._id);
    } else {
      article.likes.push(req.user._id);
    }
    await article.save();
    res.json({ likes: article.likes.length });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const bookmarkArticle = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) return res.status(404).json({ message: 'Article not found' });
    
    const user = await User.findById(req.user._id);
    const isBookmarked = user.bookmarks.includes(article._id);
    if (isBookmarked) {
      user.bookmarks.pull(article._id);
    } else {
      user.bookmarks.push(article._id);
    }
    await user.save();
    res.json({ bookmarks: user.bookmarks, isBookmarked: !isBookmarked });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getSavedArticles = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate({
      path: 'bookmarks',
      populate: { path: 'magazineId' }
    });
    res.json(user.bookmarks || []);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getArticles, getArticleById, createArticle, likeArticle, bookmarkArticle, getSavedArticles };
