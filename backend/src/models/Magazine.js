const mongoose = require('mongoose');

const magazineSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { 
    type: String, 
    enum: ['Technology', 'Business', 'Health & Fitness', 'Travel', 'Education', 'History', 'Personality Disorders', 'Love', 'Relationships', 'Emotions', 'AI'],
    required: true
  },
  coverImage: { type: String, required: true },
  publishDate: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Magazine', magazineSchema);
