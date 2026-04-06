const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_for_dev';

// Middleware
const auth = (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

// Get current user
router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// Update profile
router.put('/profile', auth, async (req, res) => {
  try {
    const { displayName, bio, role, skills, projects, theme, socials, avatar } = req.body;
    let user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ msg: 'User not found' });

    user.displayName = displayName || user.displayName;
    user.bio = bio || user.bio;
    user.role = role || user.role;
    user.skills = skills || user.skills;
    user.projects = projects || user.projects;
    user.theme = theme || user.theme;
    user.socials = socials || user.socials;
    user.avatar = avatar || user.avatar;

    await user.save();
    res.json(user);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// Get public profile by username
router.get('/public/:username', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username }).select('-password -email -_id -__v');
    if (!user) return res.status(404).json({ msg: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

module.exports = router;
