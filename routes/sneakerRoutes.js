const express = require('express');
const sneakerController = require('../controllers/sneakerController');
const router = express.Router();

router.route('/').get(sneakerController.getAllSneakers);

module.exports = router;
