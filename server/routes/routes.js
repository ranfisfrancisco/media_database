const express = require('express');

const router = express.Router();

const controller = require('../controllers/controller');

router.get('/api/', controller.home);
router.post('/api/media_users', controller.userLogin);
router.get('/api/media', controller.searchMediaItem);
router.post('/api/media', controller.updateMediaItem);
router.put('/api/media', controller.createMediaItem);
router.delete('/api/media', controller.deleteMediaItem);
router.get('/api/media_types', controller.getAllTypes);
router.get('/api/media_ownerships', controller.getAllOwnerships);
router.get('/api/media_statuses', controller.getAllStatuses);

module.exports = router;
