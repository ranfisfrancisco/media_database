const initState = { data: [] };

export default (state = initState, action) => {
	switch(action.type) {
		case 'ADMIN_GET_TOP_BORROWED_BOOKS_BY_YEAR_SUCCESS': {
			return { data: action.payload };
		}
		default: {
			return state;
		}
	}
}
