const express = require('express');
const { Post } = require('../db/models');
const { Favorites, Checkup } = require('../db/models');

const router = express.Router();

router.get('/posts', async (req, res) => {
  const posts = await Post.findAll({ where: { userId: req.session.user?.id } });
  res.json(posts);
});

router.get('/favourites', async (req, res) => {
  const faves = await Favorites.findAll({ where: { userId: req.session.user?.id } });
  res.json(faves);
});

router.get('/checkup', async (req, res) => {
  const checkups = await Checkup.findAll({ where: { user_id: req.session.user?.id }, order: ['date', 'DESC'] });
  res.json(checkups);
});

router.post('/checkup', async (req, res) => {
  const { name, date, description } = req.body;
  const newCheckup = await Checkup.create({
    name, date, description, user_id: req.session?.user?.id,
  });
  res.json(newCheckup);
});

module.exports = router;
