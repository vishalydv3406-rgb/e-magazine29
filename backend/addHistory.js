const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./src/models/User');
const Magazine = require('./src/models/Magazine');
const Article = require('./src/models/Article');
const connectDB = require('./src/config/db');

dotenv.config({ path: __dirname + '/.env' });
connectDB().then(async () => {
  try {
    const admin = await User.findOne({ role: 'admin' });
    if (!admin) throw new Error("Admin not found");

    const mag = await Magazine.create({
      title: 'Indian History Monthly',
      description: 'Legends, Empires, and the vibrant tapestry of Indian historical heritage.',
      category: 'History',
      coverImage: 'https://images.unsplash.com/photo-1599387737281-f0fb8189b3ea?auto=format&fit=crop&q=80&w=400' // Better Indian history/heritage image
    });
    
    for(let i=1; i<=10; i++) {
      await Article.create({
        title: `The Great Empires of India - Era ${i}`,
        content: `
          <h2 class="text-2xl font-bold mt-8 mb-4">The Golden Age of Indian History</h2>
          <p class="mb-4">India's vibrant past is characterized by the monumental rise and fall of great empires such as the Mauryan, Gupta, and Mughal dynasties. In part ${i} of our deep dive, we examine the breathtaking architectural feats and profound philosophical foundations built during these periods.</p>
          <blockquote class="border-l-4 border-amber-500 pl-4 italic my-6 text-zinc-600 dark:text-zinc-400">
            "History is not merely the chronological record of conquests, but the living memory of a civilization's spiritual and intellectual triumphs."
          </blockquote>
          <p class="mb-4">From the edicts of Ashoka, which champion non-violence and ethical governance, to the unparalleled mathematical discoveries made in ancient universities like Nalanda, the subcontinent has consistently shaped the trajectory of global history.</p>
          <h3 class="text-xl font-semibold mt-6 mb-3">Cultural Integration and Trade</h3>
          <p class="mb-4">Situated at the heart of the majestic Silk Road oceanic routes, ancient India was an unparalleled hub of international commerce. Spices, textiles, and philosophical ideologies were exported world-wide. In our modern era, rediscovering these historical networks sheds light on how deeply interconnected the ancient world truly was.</p>
        `,
        magazineId: mag._id,
        authorId: admin._id,
        readingTime: 6,
        status: 'published'
      });
    }
    console.log('Successfully added Indian History Magazine and Articles!');
  } catch (err) {
    console.error(err);
  } finally {
    process.exit();
  }
});
