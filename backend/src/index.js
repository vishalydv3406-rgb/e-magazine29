require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const mongoSanitize = require('express-mongo-sanitize');
const connectDB = require('./config/db');

const authRoutes = require('./routes/authRoutes');
const magazineRoutes = require('./routes/magazineRoutes');
const articleRoutes = require('./routes/articleRoutes');
const commentRoutes = require('./routes/commentRoutes');

const app = express();

// Connect to Database
connectDB();

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(mongoSanitize());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/magazines', magazineRoutes);
app.use('/api/articles', articleRoutes);
app.use('/api/comments', commentRoutes);

app.get('/', (req, res) => {
  res.send('MERN E-Magazine API is running...');
});

app.use((err, req, res, next) => {
  console.error("EXPRESS ERROR CAUGHT:", err);
  res.status(500).json({ message: err.message, stack: err.stack });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
