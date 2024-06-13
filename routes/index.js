const express = require('express');
const router = express.Router();
const { createBill } = require('../controllers/bill-controllers');

router.post('/', createBill);

module.exports = router;
