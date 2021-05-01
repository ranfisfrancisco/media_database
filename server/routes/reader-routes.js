const express = require('express');

const router = express.Router();

const reader = require('../controllers/reader');

router.post('/login', reader.login);
router.get('/search/id/:docId', reader.searchDocById);
router.get('/search/title/:title', reader.searchDocByTitle);
router.get('/search/publisher/:publisher', reader.searchDocByPublisher);
router.post('/checkout', reader.checkoutDoc);
router.post('/return', reader.returnDoc);
router.post('/reserve', reader.reserveDoc);
router.post('/get_fine', reader.computeFine);
router.get('/get_reserved/:readerId', reader.getReserveDocs);
router.get('/get_publisher_docs/:publisher', reader.getPublisherDocs)

module.exports = router;
