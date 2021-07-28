import { combineReducers } from 'redux';

// reader
import searchReducer from './search';
import mediaTypesReducer from './mediaTypes';
import mediaFormatsReducer from './mediaFormats';
import mediaStatusesReducer from './mediaStatuses';
import pageReducer from './page';

export default combineReducers({
	search: searchReducer,
	mediaTypes: mediaTypesReducer,
	mediaFormats: mediaFormatsReducer,
	mediaStatuses: mediaStatusesReducer,
	page: pageReducer
});
