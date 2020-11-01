const express = require('express');
const viewController = require('../controllers/viewController');
const authController = require('../controllers/authController');

const router = express.Router();

router.use(authController.isLoggedIn);

router
  .route('/sneakers/:brand')
  .get(authController.isLoggedIn, viewController.getSneakerDirectory);
router
  .route('/sneakers/:brand/:sneakerId')
  .get(authController.isLoggedIn, viewController.getSneaker);
router.route('/login').get(authController.isLoggedIn, viewController.getLogin);
router.route('/me').get(authController.protect, viewController.getAccount);

router.route('/').get(viewController.getHome);

module.exports = router;
