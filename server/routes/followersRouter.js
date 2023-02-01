const express = require('express');
const { Op } = require('sequelize');
const { Follower, Post, User } = require('../db/models');

const router = express.Router();

router.get('/', async (req, res) => {
  const user = req.session.user?.id;
  const followedUsers = await Follower.findAll({ where: { follower_id: user }, include: [User] });
  const posts = await Post.findAll({
    where: {
      userId: { [Op.in]: followedUsers.map((el) => el.User.id) },
    },
    include: User,
  });
  res.json(posts);
});

router.post('/:id', async (req, res) => {
  const follower_id = req.session.user?.id;
  const user_id = req.params.id;
  const [follower, created] = await Follower.findOrCreate({
    where: { follower_id, user_id },
  });
  const follower2 = await Follower.findOne({ where: { follower_id, user_id }, include: [User] });
  if (!created) {
    await Follower.destroy({ where: { follower_id, user_id } });
  }
  res.json(follower2);
});

module.exports = router;
