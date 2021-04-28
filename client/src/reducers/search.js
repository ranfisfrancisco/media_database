const initState = { data: [] };

export default (state = initState, action) => {
	switch(action.type) {
		case 'SEARCH_BY_TITLE_SUCCESS': {
			return { data: action.payload };
		}
		case 'SEARCH_BY_ID_SUCCESS': {
			return { data: action.payload };
		}
		case 'SEARCH_BY_PUBLISHER_SUCCESS': {
			return { data: action.payload };
		}
		default: {
			return state;
		}
	}
}
