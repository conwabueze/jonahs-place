const express = require('express');
const sneakerController = require('../controllers/sneakerController');
const router = express.Router();

router
  .route('/')
  .get(sneakerController.getAllSneakers)
  .post(sneakerController.createSneaker);

module.exports = router;
