import { combineReducers } from 'redux';

// reader
import searchReducer from './search';
import mediaTypesReducer from './mediaTypes';
import mediaOwnershipsReducer from './mediaOwnerships';
import mediaStatusesReducer from './mediaStatuses';
import pageReducer from './page';

export default combineReducers({
	search: searchReducer,
	mediaTypes: mediaTypesReducer,
	mediaOwnerships: mediaOwnershipsReducer,
	mediaStatuses: mediaStatusesReducer,
	page: pageReducer
});
