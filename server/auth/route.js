const express = require('express');

const routes = express.Router();

const model = require('./model');

routes.route('/register').post(async (req, res) => {
  try {
    const registerUser = await model.create(req.body);
    res.status(201).json(registerUser.toAuthJSON());
  } catch (error) {
    res.status(401).json({ error: 'Username exists try another one!' });
  }
});

routes.route('/login').post(async (req, res) => {
  const userInfo = req.body;
  const user = await model.findOne({ username: userInfo.username });
  if (user && user.validPassword(userInfo.password)) {
    res.json(
      user.toAuthJSON()
    );
  } else {
    res.status(401).json({ error: 'Invalid login. Please try again.' });
  }
});

module.exports = routes;
