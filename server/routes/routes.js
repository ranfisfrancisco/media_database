const express = require('express');

const router = express.Router();

const controller = require('../controllers/controller');

router.get('/', controller.home);
router.get('/media_types', controller.getAllTypes);
router.get('/media_formats', controller.getAllFormats);
router.get('/media_statuses', controller.getAllFormats);
router.get('/media', controller.getAllMedia);
router.get('/media/id/:mediaID', controller.searchByID);
router.get('/media/name/:mediaName', controller.searchByName);

module.exports = router;
