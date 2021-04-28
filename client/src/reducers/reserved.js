const initState = { data: [] };

export default (state = initState, action) => {
	switch(action.type) {
		case 'GET_RESERVED_DOCS_SUCCESS': {
			return { data: action.payload };
		}
		default: {
			return state;
		}
	}
}
