const express = require('express');
const {
  Like,
} = require('../db/models');

const router = express.Router();

router.route('/:id')
  .get(async (req, res) => {
    try {
      const postLikes = await Like.findAll({ where: { postId: req.params.id } });
      res.json(postLikes);
    } catch (error) {
      console.log(error);
    }
  })
  .post(async (req, res) => {
    const postId = req.params.id;
    const userId = req.session.user.id;
    const [oneLike, isExist] = await Like.findOrCreate({
      where: { postId, userId },
      defaults: { postId, userId },
    });
    if (!isExist) {
      await Like.destroy({ where: { postId, userId } });
      const allLeftLikes = await Like.findAll({ where: { postId } });
      return res.json(allLeftLikes);
    }
    const allLikesPlusOne = await Like.findAll({ where: { postId } });
    return res.json(allLikesPlusOne);
  });

router.get('/:id/user', async (req, res) => {
  try {
    const userId = req.session.user.id;
    const postId = req.params.id;
    const userLike = await Like.findOne({
      where: {
        userId, postId,
      },
    });
    if (userLike) {
      return res.json({ message: 'yes' });
    } return res.json({ message: 'no' });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
