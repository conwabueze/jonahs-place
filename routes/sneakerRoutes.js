const express = require('express');
const sneakerController = require('../controllers/sneakerController');
const router = express.Router();
const authController = require('../controllers/authController');
const reviewRoutes = require('./reviewRoutes');

router.use('/:sneakerId/reviews', reviewRoutes);

router
  .route('/sneakers-released/:year')
  .get(sneakerController.sneakersReleasedIn);

router.route('/sneaker-averages/:type?').get(sneakerController.sneakerAverages);

router
  .route('/:id')
  .get(sneakerController.getSneaker)
  .patch(sneakerController.updateSneaker)
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    sneakerController.deleteSneaker
  );

router
  .route('/')
  .get(authController.protect, sneakerController.getAllSneakers)
  .post(
    authController.protect,
    authController.restrictTo('admin'),
    sneakerController.createSneaker
  );

//POST /sneakers/598530/reviews
//GET  /sneakers/489389/reviews
//GET  /sneakers/489389/reviews/e8ew9
//router.route(':sneakerId/reviews').post

module.exports = router;
