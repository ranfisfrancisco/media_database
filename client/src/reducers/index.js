import { combineReducers } from 'redux';

// reader
import pageReducer from './page';
import searchReducer from './search';
import reservedReducer from './reserved';
import publisherDocsReducer from './publisherDocs';
// admin
import branchInfoReducer from './branchInfo';
import topLibraryBorrowersReducer from './topLibraryBorrowers';
import topBranchBorrowersReducer from './topBranchBorrowers';
import topBorrowedBranchReducer from './topBorrowedBranch';
import topBorrowedLibraryReducer from './topBorrowedLibrary';
import topLibBooksByYearReducer from './topLibBooksByYear';

export default combineReducers({
	page: pageReducer,
	search: searchReducer,
	reserved: reservedReducer,
	publisherDocs: publisherDocsReducer,
	branchInfo: branchInfoReducer,
	topLibraryBorrowers: topLibraryBorrowersReducer,
	topBranchBorrowers: topBranchBorrowersReducer,
	topBorrowedBranch: topBorrowedBranchReducer,
	topBorrowedLibrary: topBorrowedLibraryReducer,
	topLibBooksByYear: topLibBooksByYearReducer,
});
