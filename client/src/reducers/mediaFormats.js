const initState = { data: [] };

export default (state = initState, action) => {
	switch(action.type) {
		case 'GET_ALL_MEDIA_FORMATS_SUCCESS': {
			return { data: action.payload };
		}
		default: {
			return state;
		}
	}
}
