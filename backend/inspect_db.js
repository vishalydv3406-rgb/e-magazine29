const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Magazine = require('./src/models/Magazine');
const connectDB = require('./src/config/db');

dotenv.config({ path: __dirname + '/.env' });
connectDB().then(async () => {
  const mags = await Magazine.find({});
  console.log("MAGAZINES IN DB:");
  mags.forEach(m => console.log(`- Title: "${m.title}", Category: "${m.category}"`));
  process.exit();
});
