const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const PORT = process.env.PORT || 5000;
const bodyParser = require('body-parser');

dotenv.config();
mongoose.connect(
  process.env.MONGODB_URL,
  {useNewUrlParser: true, useUnifiedTopology: true},
  () => {
    console.log('mongodb is connected');
  }
);

//middle were
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
const authRoute = require('./router/auth');
const postRoute = require('./router/post');

//rout middle wire

app.use('/api/user', authRoute);
app.use('/api/posts', postRoute);

app.listen(PORT, () => console.log(`server is running on ${PORT}`));
