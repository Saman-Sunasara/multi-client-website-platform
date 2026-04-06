const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// CORS: allow any Vercel/frontend URL via environment variable
const allowedOrigins = [
  'http://localhost:5173',
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (e.g., Render health checks, curl)
    if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
    callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
}));

app.use(express.json());

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);

app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'Multi-Client SaaS Platform API ✅' });
});

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || '';
const IS_PROD = process.env.NODE_ENV === 'production';

async function startServer() {
  try {
    let uri = MONGO_URI;

    if (!uri || (!IS_PROD && uri.includes('localhost'))) {
      // Dev only: use in-memory MongoDB
      const { MongoMemoryServer } = require('mongodb-memory-server');
      console.log('⚡ Starting in-memory MongoDB (dev mode)...');
      const mongoServer = await MongoMemoryServer.create();
      uri = mongoServer.getUri();
      console.log(`✅ In-memory MongoDB ready`);
    } else if (!uri) {
      throw new Error('MONGO_URI environment variable is required in production');
    }

    await mongoose.connect(uri);
    console.log('✅ Connected to MongoDB');

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error('❌ Failed to start server:', err.message);
    process.exit(1);
  }
}

startServer();
