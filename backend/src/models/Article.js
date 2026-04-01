const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  magazineId: { type: mongoose.Schema.Types.ObjectId, ref: 'Magazine', required: true },
  authorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  readingTime: { type: Number, required: true }, // in minutes
  status: { type: String, enum: ['draft', 'published'], default: 'draft' },
  isPremium: { type: Boolean, default: false },
  views: { type: Number, default: 0 },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
}, { timestamps: true });

articleSchema.index({ title: 'text', content: 'text' }); // For text search

module.exports = mongoose.model('Article', articleSchema);
