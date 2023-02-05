const express = require('express');
const { Post } = require('../db/models');
const { Favorites, Checkup, User } = require('../db/models');

const router = express.Router();

router.get('/posts', async (req, res) => {
  const posts = await Post.findAll({ where: { userId: req.session.user?.id } });
  res.json(posts);
});

router.get('/favourites', async (req, res) => {
  const faves = await Favorites.findAll({ where: { userId: req.session.user?.id }, include: Post });
  res.json(faves);
});

router.get('/checkup', async (req, res) => {
  const checkups = await Checkup.findAll({ where: { user_id: req.session.user?.id }, order: [['date', 'DESC']] });
  res.json(checkups);
});

router.post('/checkup', async (req, res) => {
  const { name, date, description } = req.body;
  const newCheckup = await Checkup.create({
    name, date, description, user_id: req.session?.user?.id,
  });
  res.json(newCheckup);
});

router.post('/checkup/:id', async (req, res) => {
  const delCheck = await Checkup.destroy({
    where: { id: req.params.id },
  });
  res.json(delCheck);
});

router.post('/:id/favourites', async (req, res) => {
  const postId = req.params.id;
  const userId = req.session?.user?.id;
  await Favorites.create({ postId, userId });
  const newFave = await Favorites.findOne({ where: { postId, userId }, include: [User, Post] });
  res.json(newFave);
});

router.delete('/:id/favourites/del', async (req, res) => {
  const postId = req.params.id;
  const userId = req.session?.user?.id;
  const fave = await Favorites.destroy({ where: { postId, userId } });
  res.json(fave);
});
module.exports = router;
