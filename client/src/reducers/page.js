const initState = {
	visible: 'homepage',
    userEmail: null,
    userID: null
};

export default (state = initState, action) => {
	switch(action.type) {
		case 'USER_LOGIN_SUCCESS': {
            return {
                ...state,
                visible: 'managemediapage',
                userEmail: action.payload.userEmail
            }
        }

        case 'USER_LOGOUT': {
            return {
                ...state,
                visible: 'homepage',
                userEmail: null
            }
        }
        default:
            return state ;
	}
}