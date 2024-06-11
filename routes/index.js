const express = require('express');
const router = express.Router();
// const controller = require('../controllers/index');

router.get('/', (req, res) => {
  res.send('Welcome to the API');
});

module.exports = router;
