const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  userid: {
    type: String,
    required: true,
  },

  post: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('post', postSchema);
