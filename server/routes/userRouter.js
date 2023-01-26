const express = require('express');
const bcrypt = require('bcrypt');
const { User } = require('../db/models');

const router = express.Router();

router.post('/signup', async (req, res) => {
  const { name, email, password, description } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Заполните все поля' });
  }
  const pass = await bcrypt.hash(pass, 2);
  const [currUser, isCreated] = await User.findOrCreate({
    where: { email },
    defaults: { name, email, password },

  });
  if (!isCreated) {
    return res.status(403).json({ message: 'User already exist' });
  }
  req.session.user = { id: currUser.id, name: currUser.name, email: currUser.email };
  res.sendStatus(200);
});

router.post('/signin', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Заполните все поля' });
  }
  const user = await User.findOne({ where: { email } });
  if (!user) {
    return res.status(400).json({ message: 'Wrong login' });
  }
  const compare = await bcrypt.compare(pass, user.password);
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