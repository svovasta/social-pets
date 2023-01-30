const express = require('express');
const { User, Post, Comment } = require('../db/models');

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
    await Comment.destroy({ where: { PostId: req.params.id } });
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

router.route('/:id/comments')
  .get(async (req, res) => {
    const allComments = await Comment.findAll({
      where: { PostId: req.params.id },
      include: [{
        model: User,
      }],
    });
    res.json(allComments);
  })
  .post(async (req, res) => {
    const commit = await Comment.create({
      text: req.body.text, userId: req.session.user.id, postId: req.params.id,
    });
    res.json(commit);
  });

module.exports = router;
