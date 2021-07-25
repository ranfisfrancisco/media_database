const express = require('express');

const router = express.Router();

const controller = require('../controllers/controller');

router.get('/', controller.home);
router.get('/media', controller.searchMediaItems);
router.post('/media', controller.updateMediaItems);
router.delete('/media', controller.deleteMediaItems);
router.get('/media_types', controller.getAllTypes);
router.get('/media_formats', controller.getAllFormats);
router.get('/media_statuses', controller.getAllStatuses);

module.exports = router;
