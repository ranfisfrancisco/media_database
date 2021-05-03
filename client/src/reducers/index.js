import { combineReducers } from 'redux';

// reader
import pageReducer from './page';
import searchReducer from './search';
import reservedReducer from './reserved';
import publisherDocsReducer from './publisherDocs';
import computeFineReducer from './computeFine';
// admin
import averageFineReducer from './averageFine';
import branchInfoReducer from './branchInfo';
import getDocCopyReducer from './getDocCopy';
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
	computeFine: computeFineReducer,
	getDocCopy: getDocCopyReducer,
	averageFine: averageFineReducer,
	topLibraryBorrowers: topLibraryBorrowersReducer,
	topBranchBorrowers: topBranchBorrowersReducer,
	topBorrowedBranch: topBorrowedBranchReducer,
	topBorrowedLibrary: topBorrowedLibraryReducer,
	topLibBooksByYear: topLibBooksByYearReducer,
});
