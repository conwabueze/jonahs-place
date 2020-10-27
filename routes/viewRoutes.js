const express = require('express');
const viewController = require('../controllers/viewController');
const authController = require('../controllers/authController');

const router = express.Router();

router.use(authController.isLoggedIn);

router.route('/sneakers/:brand').get(viewController.getSneakerDirectory);
router.route('/sneakers/:brand/:sneakerId').get(viewController.getSneaker);
router.route('/login').get(viewController.getLogin);

router.route('/').get(viewController.getHome);

module.exports = router;
