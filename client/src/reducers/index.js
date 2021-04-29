import { combineReducers } from 'redux';

// reader
import pageReducer from './page';
import searchReducer from './search';
import reservedReducer from './reserved';
import publisherDocsReducer from './publisherDocs';
// admin
import branchInfoReducer from './branchInfo';
import topLibraryBorrowersReducer from './topLibraryBorrowers';
import topBorrowedBranchReducer from './topBorrowedBranch';
import topBorrowedLibraryReducer from './topBorrowedLibrary';

export default combineReducers({
	page: pageReducer,
	search: searchReducer,
	reserved: reservedReducer,
	publisherDocs: publisherDocsReducer,
	branchInfo: branchInfoReducer,
	topLibraryBorrowers: topLibraryBorrowersReducer,
	topBorrowedBranch: topBorrowedBranchReducer,
	topBorrowedLibrary: topBorrowedLibraryReducer,
});
