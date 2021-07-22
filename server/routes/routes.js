const express = require('express');

const router = express.Router();

const controller = require('../controllers/controller');

router.get('/', controller.home);
router.get('/media', controller.search);
router.post('/media', controller.update);
router.get('/media_types', controller.getAllTypes);
router.get('/media_formats', controller.getAllFormats);
router.get('/media_statuses', controller.getAllStatuses);

module.exports = router;
