const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  title: String,
  description: String,
  image: String,
  link: String,
  tags: [String],
});

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  displayName: { type: String, default: '' },
  bio: { type: String, default: '' },
  role: { type: String, default: 'AI/ML Engineer' },
  avatar: { type: String, default: '' },
  skills: [String],
  projects: [ProjectSchema],
  theme: {
    primaryColor: { type: String, default: '#6366f1' }, // Indigo-500
    darkMode: { type: Boolean, default: true },
    font: { type: String, default: 'Inter' },
  },
  socials: {
    github: { type: String, default: '' },
    linkedin: { type: String, default: '' },
    twitter: { type: String, default: '' },
    instagram: { type: String, default: '' },
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', UserSchema);
