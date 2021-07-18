import { combineReducers } from 'redux';

// reader
//import pageReducer from './page';
import searchReducer from './search';
import mediaTypesReducer from './mediaTypes';
import mediaFormatsReducer from './mediaFormats';
import mediaStatusesReducer from './mediaStatuses';

export default combineReducers({
	//page: pageReducer,
	search: searchReducer,
	mediaTypes: mediaTypesReducer,
	mediaFormats: mediaFormatsReducer,
	mediaStatuses: mediaStatusesReducer

});
