const express = require('express');
const {
  User, Post, Comment,
} = require('../db/models');

const router = express.Router();

router.route('/post/:id/')
  .get(async (req, res) => {
    const allComments = await Comment.findAll({
      where: { postId: req.params.id },
      include: [User, Post],
    });
    res.json(allComments);
  })
  .post(async (req, res) => {
    const commit = await Comment.create({
      text: req.body.text, userId: req.session.user.id, postId: req.params.id,
    });
    res.json(commit);
  });

router.delete('/post/:id/comment/:commentId', async (req, res) => {
  await Comment.destroy({ where: { id: req.params.commentId, postId: req.params.id } });
  res.sendStatus(200);
});

module.exports = router;
