const express = require('express');

const router = express.Router();

const reader = require('../controllers/reader');

router.get('/search', reader.searchDoc);
router.post('/checkout', reader.checkoutDoc);
router.post('/return', reader.returnDoc);
router.post('/reserve', reader.reserveDoc);
router.get('/get_fine', reader.computeFine);
router.get('/get_reserved', reader.getReserveDocs);
router.get('/get_publisher_docs', reader.getPublisherDocs)

module.exports = router;
