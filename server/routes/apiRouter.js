const express = require('express');
const { Post } = require('../db/models');
const { Favorites } = require('../db/models');

const router = express.Router();

router.get('/posts', async (req, res) => {
  const posts = await Post.findAll({ where: { userId: req.session.user?.id } });
  res.json(posts);
});

router.get('/favourites', async (req, res) => {
  const faves = await Favorites.findAll({ where: { userId: req.session.user?.id } });
  res.json(faves);
});

module.exports = router;
