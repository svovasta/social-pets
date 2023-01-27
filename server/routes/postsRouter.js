const express = require('express');
const { User, Post } = require('../db/models');

const router = express.Router();

router.route('/')
  .get(async (req, res) => {
    const allPosts = await Post.findAll({ include: User });
    res.json(allPosts);
  })
  .post(async (req, res) => {
    console.log('REQ BODY--->', req.body);
    const newPost = await Post.create(req.body);
    const sendPost = await Post.findOne({
      where: req.body,
      include: User,
    });
    res.json(sendPost);
  });

router.route('/:id')
  .delete(async (req, res) => {
    await Post.destroy({ where: { id: req.params.id } });
    res.sendStatus(200);
  })
  .patch(async (req, res) => {
    const { text, image } = req.body;
    const post = await Post.findOne({ where: { id: req.params.id } });
    post.text = text;
    post.image = image;
    post.save();
    res.json(post);
  });

module.exports = router;
