const express = require('express');
const { Discussions } = require('../db/models');

const router = express.Router();

router.get('/', async (req, res) => {
  const discussions = await Discussions.findAll();
  res.json(discussions);
});

router.post('/add', async (req, res) => {
  const { userId } = req.session.user.id;
  const { title } = req.body;
  const newDiscussion = await Discussions.create({ title, userId });
  res.json(newDiscussion);
});

module.exports = router;
