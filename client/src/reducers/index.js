import { combineReducers } from 'redux';

// reader
//import pageReducer from './page';
import searchReducer from './search';
import mediaTypesReducer from './mediaTypes';

export default combineReducers({
	//page: pageReducer,
	search: searchReducer,
	mediaTypes: mediaTypesReducer
});
