const express = require('express');
const multer = require('multer');
const bcrypt = require('bcrypt');
const path = require('path');
const {
  User, Post, Comment,
} = require('../db/models');

const router = express.Router();

const avatarsPath = './img/usersAvatars';

const avatarsStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, avatarsPath);
  },

  filename: (req, file, cb) => {
    cb(null, `${file.originalname}.jpg`);
  },
});

const avatarsUpload = multer({ storage: avatarsStorage });

router.post('/upload-avatar', avatarsUpload.single('avatar'), async (req, res) => {
  const userId = req.session.user.id;
  const user = await User.findByPk(userId);
  user.avatar = req.file.path;
  user.save();
  res.sendStatus(200);
});

router.get('/img/usersAvatars/:name.jpg', (req, res) => {
  const { name } = req.params;
  res.sendFile(path.join(__dirname, `../img/usersAvatars/${name}.jpg`));
});

router.get('/', async (req, res) => {
  const user = await User.findOne({
    where: { id: req.session.user.id },
    include: [Post, Comment],
  });
  res.json(user);
});

router.post('/signup', async (req, res) => {
  try {
    const {
      name, email, password,
    } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }
    const pass = await bcrypt.hash(password, 2);
    const [currUser, isCreated] = await User.findOrCreate({
      where: { email },
      defaults: { name, email, password: pass },

    });
    if (!isCreated) {
      return res.status(403).json({ message: 'User already exist' });
    }
    req.session.user = { id: currUser.id, name: currUser.name, email: currUser.email };
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
  }
});

router.post('/signin', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'All fields must be filled' });
  }
  const user = await User.findOne({ where: { email } });
  if (!user) {
    return res.status(400).json({ message: "User with this email doesn't exist" });
  }
  const compare = await bcrypt.compare(password, user.password);
  if (compare) {
    req.session.user = { id: user.id, name: user.name };
  } else {
    return res.status(400).json({ message: 'Wrong password' });
  }
  res.sendStatus(200);
});

router.get('/check', (req, res) => {
  if (req.session.user) {
    return res.json(req.session.user);
  }
  return res.sendStatus(401);
});

router.get('/logout', (req, res) => {
  req.session.destroy();
  res.clearCookie('sid').sendStatus(200);
});

router.patch('/:id/edit', async (req, res) => {
  // const { id } = req.params;
  const { name, description } = req.body.values;
  const editedUser = await User.findOne({ where: { id: req.params.id } });
  editedUser.name = name;
  editedUser.description = description;
  editedUser.save();
  res.json(editedUser);
});

module.exports = router;
