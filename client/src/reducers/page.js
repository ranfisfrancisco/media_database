const initState = {
	visible: 'managemediapage',
    userEmail: null,
    userID: null
};

export default (state = initState, action) => {
	switch(action.type) {
		case 'USER_LOGIN_SUCCESS': {
            return {
                ...state,
                userEmail: action.payload.userEmail
            }
        }

        case 'USER_SERVER_LOGIN_SUCCESS': {
            return {
                ...state,
                visible: 'managemediapage',
                userID: action.payload[0].user_id
            }
        }

        case 'USER_LOGOUT': {
            return {
                ...state,
                visible: 'homepage',
                userEmail: null,
                userID: null,
            }
        }
        default:
            return state ;
	}
}