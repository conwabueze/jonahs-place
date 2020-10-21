const express = require('express');
const router = express.Router();
const viewController = require('../controllers/viewController');

router.route('/sneakers/:brand').get(viewController.getSneakerDirectory);
router.route('/sneakers/:brand/:sneakerId').get(viewController.getSneaker);
router.route('/login').get(viewController.getLogin);

router.route('/').get(viewController.getHome);

module.exports = router;
