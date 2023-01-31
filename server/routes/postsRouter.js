const express = require('express');
const multer = require('multer');
const path = require('path');
const {
  User, Post, Like, Comment,
} = require('../db/models');

const router = express.Router();

const imagesPath = './img/postsImages';

const postsStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    // console.log('FILE =======>', file);
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

router.get('/img/postsImages/:name.jpg', (req, res) => {
  const { name } = req.params;
  res.sendFile(path.join(__dirname, `../img/postsImages/${name}.jpg`));
});

router.route('/')
  .get(async (req, res) => {
    const allPosts = await Post.findAll({ include: User, order: [['createdAt', 'DESC']] });
    res.json(allPosts);
  })
  .post(async (req, res) => {
    try {
      const { text, image } = req.body;
      // console.log('REQ BODY--->', req.body);
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
    await Comment.destroy({ where: { postId: req.params.id } });
    res.sendStatus(200);
  });

router.route('/:id')

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
      where: { postId: req.params.id },
      include: [User, Post],
    });
    res.json(allComments);
  })
  .post(async (req, res) => {
    const { text } = req.body;
    const commit = await Comment.create({
      text: req.body.text, userId: req.session.user.id, postId: req.params.id,
    });
    res.json(commit);
  });

router.delete('/:id/comments/:commentId', async (req, res) => {
  await Comment.destroy({ where: { id: req.params.commentId, postId: req.params.id } });
  res.sendStatus(200);
});

router.route('/:id/likes')
  .get(async (req, res) => {
    const postId = req.params.id;
    const postLikes = await Like.findAll({ where: { postId } });
    res.json(postLikes);
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

router.get('/:id/user/like', async (req, res) => {
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
});

module.exports = router;
