const express = require('express');

const router = express.Router();

const controller = require('../controllers/controller');

router.get('/', controller.home);
router.get('/media', controller.getAllMedia);
router.get('/media/id/:mediaID', controller.searchByID);
router.get('/media/name/:mediaName', controller.searchByName);

module.exports = router;
