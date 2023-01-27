const express = require('express');
const path = require('path');
const multer = require('multer');
const { User, Post } = require('../db/models');

const router = express.Router();

const avatarsPath = './img/usersAvatars';

const avatarsStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, avatarsPath);
  },

  filename: (req, file, cb) => {
    console.log(file);
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const avatarsUpload = multer({ storage: avatarsStorage });

const imagesPath = './img/postsImages';

const postsStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, imagesPath);
  },

  filename: (req, file, cb) => {
    console.log(file);
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const postsUpload = multer({ storage: postsStorage });

router.route('/')
  .get(async (req, res) => {
    const allPosts = await Post.findAll({ include: User });
    res.json(allPosts);
  })
  .post(async (req, res) => {

    try {
      const { text, image } = req.body;
      console.log('REQ BODY--->', req.body);
      await Post.create({
        text, image, userId: req.session.user.id,
      });
      const sendPost = await Post.findOne({
        where: req.body,
        include: User,
      });
      res.json(sendPost);
    } catch (err) {
      console.log(err);
    }
  });
// .post(postsUpload.single('image'), async (req, res) => {
//   console.log('REQ BODY--->', req.body);
//   const { text, userId } = req.body;
//   const newPost = await Post.create({
//     text,
//     image: req.file ? req.file.path : '',
//     userId,
//   });
//   const sendPost = await Post.findOne({
//     where: req.body,
//     include: User,
//   });
//   res.json(sendPost);
// });

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
