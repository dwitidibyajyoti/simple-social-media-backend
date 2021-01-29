const router = require('express').Router();
const auth = require('./verifaytoken');
const {postvalidate} = require('../validater');
const User = require('../model/User');
const Post = require('../model/post');

router.get('/', auth, (req, res) => {
  console.log(req.valid);

  //   res.json({
  //     posts: {
  //       title: 'my first post',
  //       description: 'random date you shulnt access',
  //     },
  //   });
});

router.post('/', auth, async (req, res) => {
  const {error} = postvalidate(req.body);
  if (error) return res.status(400).send('use more than 6 leter');

  const userId = await User.findOne({_id: req.valid.foo});

  if (!userId) return res.status(400).send('usernot valid');

  const post = new Post({
    userid: userId._id,

    post: req.body.post,
  });

  try {
    const savepost = await post.save();
    res.status(201).send('posted');
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});
module.exports = router;
