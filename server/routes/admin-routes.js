const express = require('express');

const router = express.Router();

const admin = require('../controllers/admin');

router.post('/login', admin.login);
router.post('/add_doc', admin.addDocCopy);
router.get('/get_doc/:bId/:docId/:copyNo', admin.getDocCopy);
router.post('/add_reader', admin.addReader);
router.get('/branch_info/:bId', admin.getBranchInfo);
router.get('/top_branch_borrowers/:branchNum/:maxBorrowers', admin.topBranchBorrowers);
router.get('/top_library_borrowers/:maxBorrowers', admin.topLibraryBorrowers);
router.get('/top_borrowed_books_branch/:branchNum/:maxBorrowers', admin.topBorrowedBooksBranch);
router.get('/top_borrowed_books_library/:maxBorrow', admin.topBorrowedBooksLibrary);
router.get('/top_borrowed_books_library_by_year/:year', admin.topBorrowedBooksLibraryByYear);
router.get('/avg_fine/:startDate/:endDate', admin.averageBranchBorrowingFine);


module.exports = router;
