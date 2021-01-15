const express = require('express');
const sneakerController = require('../controllers/sneakerController');
const router = express.Router();
const authController = require('../controllers/authController');
const reviewRoutes = require('./reviewRoutes');

//router.use('/:sneakerId/reviews', reviewRoutes);
router.use(authController.isLoggedIn);

router
  .route('/sneakers-released/:year')
  .get(sneakerController.sneakersReleasedIn);

router.route('/sneaker-averages/:type?').get(sneakerController.sneakerAverages);
router
  .route('/recommendations/:sneakerId')
  .get(sneakerController.getSneakerRecommendations);

router
  .route('/:brand')
  .get(authController.isLoggedIn, sneakerController.getAllSneakersByBrand);

router
  .route('/:brand/:id')
  .get(sneakerController.getSneaker)
  .patch(
    authController.protect,
    authController.restrictTo('admin'),
    sneakerController.updateSneaker
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    sneakerController.deleteSneaker
  );

router
  .route('/')
  .get(sneakerController.getAllSneakers)
  .post(
    authController.protect,
    authController.restrictTo('admin'),
    sneakerController.createSneaker
  );

module.exports = router;
