const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);

app.get('/', (req, res) => {
  res.send('Multi-Client SaaS Platform API is running ✅');
});

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || '';

async function startServer() {
  try {
    let uri = MONGO_URI;

    // If no real MongoDB URI provided, use in-memory database (dev only)
    if (!uri || uri.includes('localhost')) {
      const { MongoMemoryServer } = require('mongodb-memory-server');
      console.log('⚡ Starting in-memory MongoDB (no local MongoDB required)...');
      const mongoServer = await MongoMemoryServer.create();
      uri = mongoServer.getUri();
      console.log(`✅ In-memory MongoDB started at: ${uri}`);
    }

    await mongoose.connect(uri);
    console.log('✅ Connected to MongoDB');

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('❌ Failed to start server:', err.message);
    process.exit(1);
  }
}

startServer();
