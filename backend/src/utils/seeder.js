const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');
const Magazine = require('../models/Magazine');
const Article = require('../models/Article');
const connectDB = require('../config/db');

dotenv.config({ path: __dirname + '/../../.env' });
connectDB();

const seedData = async () => {
  const generateRichContent = (category, i) => {
    return `
      <h2 class="text-2xl font-bold mt-8 mb-4">Introduction to ${category} Innovations</h2>
      <p class="mb-4">Welcome to part ${i} of our deep dive into the world of ${category}. In this entry, we explore the groundbreaking changes that are reshaping the landscape. Industry leaders have recently shifted their focus towards more sustainable and scalable practices. This shift is not just a trend, but a fundamental evolution in how we approach problem-solving and value creation in ${category}.</p>
      
      <h3 class="text-xl font-semibold mt-6 mb-3">Key Trends Shaping the Future</h3>
      <ul class="list-disc pl-6 mb-4 space-y-2">
        <li><strong>Automation & AI:</strong> The integration of intelligent systems is streamlining workflows and reducing human error.</li>
        <li><strong>Sustainability:</strong> Eco-friendly initiatives are no longer optional. Consumers are demanding greener alternatives.</li>
        <li><strong>Decentralization:</strong> Distributing power and resources closer to the edge is proving to be far more resilient.</li>
      </ul>

      <blockquote class="border-l-4 border-blue-500 pl-4 italic my-6 text-zinc-600 dark:text-zinc-400">
        "The future of ${category} lies in finding the delicate balance between rapid innovation and long-term sustainability. Those who adapt will thrive, while those who resist will inevitably fall behind."
      </blockquote>

      <h3 class="text-xl font-semibold mt-6 mb-3">Understanding the Core Challenges</h3>
      <p class="mb-4">Despite the rapid pace of innovation, several hurdles remain. Legacy systems often slow down the adoption of newer technologies, and the initial costs of transformation can be prohibitive for smaller entities. However, the long-term ROI of modernization generally outweighs the upfront investment.</p>
      
      <p class="mb-4">Moreover, the talent gap is a pressing issue. There is a high demand for skilled professionals who can navigate these new paradigms, but supply is struggling to keep up. Educational institutions and corporate training programs must align their curricula with the real-world needs of the ${category} sector.</p>

      <h2 class="text-2xl font-bold mt-8 mb-4">Conclusion</h2>
      <p>As we look ahead, it is clear that ${category} will continue to evolve at a breakneck pace. Staying informed and adaptable is key. Join us next time as we continue to unpack these complex dynamics and offer actionable insights for professionals in the field.</p>
    `;
  };

  try {
    await User.deleteMany();
    await Magazine.deleteMany();
    await Article.deleteMany();

    // Create Admin User
    const admin = await User.create({
      name: 'Admin User',
      email: 'admin@example.com',
      password: 'password123',
      role: 'admin'
    });

    // Create 5 Magazines
    const categories = ['Technology', 'Business', 'Health & Fitness', 'Travel', 'Education'];
    const createdMagazines = await Promise.all(
      categories.map(async (cat) => {
        return await Magazine.create({
          title: `${cat} Monthly`,
          description: `The best insights on ${cat}.`,
          category: cat,
          coverImage: `https://picsum.photos/seed/${cat.replace(/\s/g, '')}/400/600`
        });
      })
    );

    // Create 10 Articles per Magazine
    for (const mag of createdMagazines) {
      for (let i = 1; i <= 10; i++) {
        await Article.create({
          title: `Exploring The Future of ${mag.category} - Part ${i}`,
          content: generateRichContent(mag.category, i),
          magazineId: mag._id,
          authorId: admin._id,
          readingTime: Math.floor(Math.random() * 10) + 3,
          status: 'published',
          isPremium: i % 5 === 0
        });
      }
    }

    console.log('Database Seeded Successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedData();
