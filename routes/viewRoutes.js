const express = require('express');
const router = express.Router();
const viewController = require('../controllers/viewController');

router.route('/sneakers/:brand').get(viewController.getSneakerDirectory);

router.route('/').get(viewController.getHome);
module.exports = router;
