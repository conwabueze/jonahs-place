const express = require('express');
const sneakerController = require('../controllers/sneakerController');
const router = express.Router();

router
  .route('/sneakers-released/:year')
  .get(sneakerController.sneakersReleasedIn);

router.route('/sneaker-averages/:type?').get(sneakerController.sneakerAverages);

router
  .route('/:id')
  .get(sneakerController.getSneaker)
  .patch(sneakerController.updateSneaker)
  .delete(sneakerController.deleteSneaker);

router
  .route('/')
  .get(sneakerController.getAllSneakers)
  .post(sneakerController.createSneaker);

module.exports = router;
