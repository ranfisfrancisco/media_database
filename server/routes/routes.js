const express = require('express');

const router = express.Router();

const controller = require('../controllers/controller');

router.get('/media', controller.getAllMedia);

module.exports = router;
