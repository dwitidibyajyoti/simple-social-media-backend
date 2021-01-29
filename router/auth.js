const router = require('express').Router();
const {regvalidater, loginvalidater} = require('../validater');
const User = require('../model/User');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/register', async (req, res) => {
  const {error} = regvalidater(req.body);
  //   console.log(chalk.redBright(error));
  //   res.send(error.details[0].message);

  if (error) return res.status(400).send(error.details[0].message);

  const emailExe = await User.findOne({email: req.body.email});

  if (emailExe) return res.status(208).send('email is alredy use');
  // incrept the password

  const salt = await bcrypt.genSalt(10);

  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  });

  try {
    const saveUser = await user.save();

    res.status(201).send({user: user._id});
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post('/login', async (req, res) => {
  const {error} = loginvalidater(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findOne({email: req.body.email});

  if (!user) return res.status(208).send('plase sign up first');
  const vadidpass = await bcrypt.compare(req.body.password, user.password);
  if (!vadidpass) return res.status(400).send('password is invalid');
  const token = jwt.sign({foo: user._id}, process.env.TOKEN_SECRET);
  res.header('auth-token', token);
  res.status(202).send(token);
});
module.exports = router;
