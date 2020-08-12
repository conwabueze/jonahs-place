const express = require('express');
const sneakerController = require('../controllers/sneakerController');
const router = express.Router();

router
  .route('/')
  .get(sneakerController.getAllSneakers)
  .post(sneakerController.createSneaker);

router
  .route('/:id')
  .get(sneakerController.getSneaker)
  .patch(sneakerController.updateSneaker)
  .delete(sneakerController.deleteSneaker);
module.exports = router;
