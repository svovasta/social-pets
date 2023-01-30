const express = require('express');
const multer = require('multer');
const bcrypt = require('bcrypt');
const {
  User, Post,
} = require('../db/models');

const router = express.Router();

const avatarsPath = './img/usersAvatars';

const avatarsStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, avatarsPath);
  },

  filename: (req, file, cb) => {
    console.log(file);
    cb(null, `${file.originalname}.jpg`);
  },
});

const avatarsUpload = multer({ storage: avatarsStorage });

router.post('/upload-avatar', avatarsUpload.single('avatar'), async (req, res) => {
  console.log('REQ FILE--->', req.file);
  const userId = req.session.user.id;
  const user = await User.findByPk(userId);
  user.avatar = req.file.path;
  user.save();
  res.sendStatus(200);
});

router.get('/img/usersAvatars/:name.jpg', (req, res) => {
  const { name } = req.params;
  res.sendFile(`/Users/zarinaromanova/Desktop/Elbrus/social-pets/server/img/usersAvatars/${name}.jpg`);
});

router.get('/', async (req, res) => {
  const user = await User.findOne({
    where: { id: req.session.user.id },
    include: Post,
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
  const compare = await bcrypt.compare(password, user.pass);
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

module.exports = router;
