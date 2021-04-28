import { combineReducers } from 'redux';

import pageReducer from './page';
import searchReducer from './search';
import reservedReducer from './reserved';
import publisherDocsReducer from './publisherDocs';

export default combineReducers({
	page: pageReducer,
	search: searchReducer,
	reserved: reservedReducer,
	publisherDocs: publisherDocsReducer,
});
