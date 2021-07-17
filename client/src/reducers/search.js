const initState = { data: [] };

export default (state = initState, action) => {
	switch(action.type) {
		case 'SEARCH_BY_ID_SUCCESS': {
			return { data: action.payload };
		}
		case 'SEARCH_BY_NAME_SUCCESS': {
			return { data: action.payload };
		}
		case 'GET_ALL_MEDIA_SUCCESS': {
			return { data: action.payload };
		}
		default: {
			return state;
		}
	}
}
