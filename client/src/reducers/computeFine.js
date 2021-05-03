const initState = { data: [] };

export default (state = initState, action) => {
	switch(action.type) {
		case 'COMPUTE_FINE_SUCCESS': {
			return { data: action.payload };
		}
		default: {
			return state;
		}
	}
}
