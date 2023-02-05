const express = require('express');
const multer = require('multer');
const path = require('path');
const {
  User, Post, Comment, Like,
} = require('../db/models');

const router = express.Router();

router.route('/')
  .get(async (req, res) => {
    const allPosts = await Post.findAll({ include: [User, Like, Comment], order: [['createdAt', 'DESC']] });
    res.json(allPosts);
  })
  .post(async (req, res) => {
    try {
      const { text, image } = req.body;
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

router.route('/:id/post')
  .get(async (req, res) => {
    const onePost = await Post.findOne({
      where: { id: req.params.id },
      include: User,
    });
    res.json(onePost);
  })
  .delete(async (req, res) => {
    await Post.destroy({ where: { id: req.params.id } });
    await Like.destroy({ where: { postId: req.params.id } });
    await Comment.destroy({ where: { postId: req.params.id } });
    res.sendStatus(200);
  })
  .patch(async (req, res) => {
    const post = await Post.findByPk(req.params.id);
    post.text = req.body.text;
    post.save();
    res.json(post);
  });

const imagesPath = './img/postsImages';

const postsStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, imagesPath);
  },

  filename: (req, file, cb) => {
    cb(null, `${file.originalname}.jpg`);
  },
});

const postsUpload = multer({ storage: postsStorage });

router.post('/upload-image', postsUpload.single('image'), async (req, res) => {
  const userId = req.session.user.id;
  const newPost = await Post.create({
    text: req.body.text,
    image: req.file ? req.file.path : '',
    userId,
  });
  res.json(newPost);
});

router.patch('/:id/edit-image', postsUpload.single('image'), async (req, res) => {
  try {
    const post = Post.findByPk(req.params.id);
    post.text = req.body.text;
    post.image = req.file ? req.file.path : '';
    post.save();
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
  }
});

router.get('/img/postsImages/:name.jpg', (req, res) => {
  const { name } = req.params;
  res.sendFile(path.join(__dirname, `../img/postsImages/${name}.jpg`));
});

module.exports = router;
