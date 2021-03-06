const express = require('express');

const router = express.Router();

const controller = require('../controllers/controller');

router.post('/media_users', controller.userLogin);
router.post('/media_users/logout', controller.userLogout);
router.get('/media', controller.searchMediaItem);
router.post('/media', controller.updateMediaItem);
router.put('/media', controller.createMediaItem);
router.delete('/media', controller.deleteMediaItem);
router.get('/media_types', controller.getAllTypes);
router.get('/media_ownerships', controller.getAllOwnerships);
router.get('/media_statuses', controller.getAllStatuses);

module.exports = router;
