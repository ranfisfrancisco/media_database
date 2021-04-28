const express = require('express');

const router = express.Router();

const admin = require('../controllers/admin');

router.post('/login', admin.login);
router.post('/add_doc', admin.addDocCopy);
router.get('/get_doc', admin.getDocCopy);
router.post('/add_reader', admin.addReader);
router.get('/branch_info', admin.getBranchInfo);
router.get('/top_branch_borrowers', admin.topBranchBorrowers);
router.get('/top_library_borrowers', admin.topLibraryBorrowers);
router.get('/top_borrowed_books_branch', admin.topBorrowedBooksBranch);
router.get('/top_borrowed_books_library', admin.topBorrowedBooksLibrary);
router.get('/top_borrowed_books_library_by_year', admin.topBorrowedBooksLibraryByYear);
router.get('/avg_fine', admin.averageBranchBorrowingFine);


module.exports = router;
