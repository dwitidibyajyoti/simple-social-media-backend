const Joi = require('joi');
const regvalidater = (data) => {
  const schama = Joi.object({
    name: Joi.string().alphanum().min(6).max(250).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  });

  return schama.validate(data);
};
const loginvalidater = (data) => {
  const schama = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  });

  return schama.validate(data);
};
const postvalidate = (data) => {
  const schama = Joi.object({
    post: Joi.string().min(6).required(),
  });

  return schama.validate(data);
};

module.exports.regvalidater = regvalidater;
module.exports.loginvalidater = loginvalidater;
module.exports.postvalidate = postvalidate;
