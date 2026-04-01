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
      title: 'Mind & Personality',
      description: 'Understanding complex psychological conditions, traits, and human behavior.',
      category: 'Personality Disorders',
      coverImage: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=400' // Better mind/personality image
    });
    
    for(let i=1; i<=5; i++) {
      await Article.create({
        title: `Understanding Personality Disorders - Concept ${i}`,
        content: `
          <h2 class="text-2xl font-bold mt-8 mb-4">Navigating the Spectrum of Personality</h2>
          <p class="mb-4">Personality disorders represent a class of mental disorders characterized by enduring maladaptive patterns of behavior, cognition, and inner experience. In Concept ${i}, we highlight critical modern approaches to psychoanalytic assessment and therapeutic care.</p>
          <blockquote class="border-l-4 border-purple-500 pl-4 italic my-6 text-zinc-600 dark:text-zinc-400">
            "We must transform the stigma around psychological complexions into a foundation for empathy and scientific understanding."
          </blockquote>
          <p class="mb-4">By acknowledging these conditions not as irreversible flaws but as deep-seated psychological adaptations, professionals and patients alike can craft robust frameworks for meaningful recovery and quality of life improvements.</p>
        `,
        magazineId: mag._id,
        authorId: admin._id,
        readingTime: 7,
        status: 'published'
      });
    }
    console.log('Successfully added Personality Disorders Magazine and Articles!');
  } catch (err) {
    console.error(err);
  } finally {
    process.exit();
  }
});
