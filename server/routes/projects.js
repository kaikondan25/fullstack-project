const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const User = require('../models/User');
const Category = require('../models/Category');

router.get('/projects', async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const sortBy = req.query.sort_by || 'recent';
  const limit = parseInt(req.query.limit) || 2; // default to 2 if not provided
  const skip = (page - 1) * limit;
  let sort = { created_at: -1 };
  if (sortBy === 'category') sort = { 'category.name': 1 };
  else if (sortBy === 'username') sort = { 'user.username': 1 };
  else if (sortBy === 'title') sort = { title: 1 };

  try {
    const projects = await Project.find()
      .populate('user', 'username')
      .populate('category', 'name')
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .exec();
    const total = await Project.countDocuments();
    res.json({ projects: projects.map(p => ({
      id: p._id,
      title: p.title,
      username: p.user.username,
      category: p.category.name,
      created_at: p.created_at
    })), total });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
