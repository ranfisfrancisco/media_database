import { combineReducers } from 'redux';

// reader
import pageReducer from './page';
import searchReducer from './search';

export default combineReducers({
	page: pageReducer,
	search: searchReducer,
});
