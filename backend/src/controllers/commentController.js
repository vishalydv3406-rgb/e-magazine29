const Comment = require('../models/Comment');
const Article = require('../models/Article');

const getCommentsByArticle = async (req, res) => {
  try {
    const comments = await Comment.find({ articleId: req.params.articleId })
      .populate('userId', 'name avatar')
      .sort({ createdAt: -1 });
    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addComment = async (req, res) => {
  try {
    const { content, articleId } = req.body;
    
    // Verify article exists
    const article = await Article.findById(articleId);
    if (!article) return res.status(404).json({ message: 'Article not found' });

    const comment = await Comment.create({
      content,
      articleId,
      userId: req.user._id
    });
    
    const populatedComment = await comment.populate('userId', 'name avatar');
    res.status(201).json(populatedComment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getCommentsByArticle, addComment };
