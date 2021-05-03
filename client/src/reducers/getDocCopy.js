const initState = { data: [] };

export default (state = initState, action) => {
	switch(action.type) {
		case 'ADMIN_SEARCH_DOC_SUCCESS': {
			return { data: action.payload };
		}
		default: {
			return state;
		}
	}
}
