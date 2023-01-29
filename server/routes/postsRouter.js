const express = require('express');
const path = require('path');
const multer = require('multer');
const { User, Post, Like } = require('../db/models');

const router = express.Router();

// const avatarsPath = './img/usersAvatars';

// const avatarsStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, avatarsPath);
//   },

//   filename: (req, file, cb) => {
//     console.log(file);
//     cb(null, Date.now() + path.extname(file.originalname));
//   },
// });

// const avatarsUpload = multer({ storage: avatarsStorage });

const imagesPath = './img/postsImages';

const postsStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log('FILE =======>', file);
    cb(null, imagesPath);
  },

  filename: (req, file, cb) => {
    cb(null, `${file.originalname}.jpg`);
  },
});

const postsUpload = multer({ storage: postsStorage });

router.post('/upload-image', postsUpload.single('image'), async (req, res) => {
  console.log('REQ BODY--->', req.body);
  console.log('REQ FILE--->', req.file);
  // const { text } = req.body;
  const userId = req.session.user.id;
  const newPost = await Post.create({
    // text,
    image: req.file ? req.file.path : '',
    userId,
  });
  // const sendPost = await Post.findOne({
  //   where: { text, userId },
  //   include: User,
  // });
  res.json(newPost);
});

router.get('/img/postsImages/:name.jpg', (req, res) => {
  const { name } = req.params;
  res.sendFile(`/home/vova/ElbrusFinalProject/SocialPets/server/img/postsImages/${name}.jpg`);
});

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
  console.log(userLike);
  if (userLike) {
    return res.json({ message: 'yes' });
  } return res.json({ message: 'no' });
});

module.exports = router;
