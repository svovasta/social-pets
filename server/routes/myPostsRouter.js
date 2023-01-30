const express = require('express');
const { Post } = require('../db/models');

const router = express.Router();

router.get('/', async (req, res) => {
  const myPosts = await Post.findAll({ where: { userId: req.session.user.id } });
  res.json(myPosts);
});

module.exports = router;
