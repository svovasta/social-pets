const express = require('express');
const { Discussion,Message } = require('../db/models');

const router = express.Router();

router.get('/', async (req, res) => {
  const allDiscussions = await Discussion.findAll();
  res.json(allDiscussions);
});

router.post('/add', async (req, res) => {
  const { userId } = req.session.user.id;
  const { title } = req.body;
  const newDiscussion = await Discussion.create({ title, userId });
  res.json(newDiscussion);
});

router.get('/messages/', async (req, res) => {
const allDiscussions = await Message.findAll({})
});
module.exports = router;
