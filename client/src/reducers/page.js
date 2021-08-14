const initState = {
	visible: 'loginpage',
    theme: "dark",
    userEmail: null,
    userID: null //ID from media database
};

export default (state = initState, action) => {
	switch(action.type) {
		// case 'USER_GOOGLE_LOGIN_SUCCESS': {
        //     return {
        //         ...state,
        //         userEmail: action.payload.userEmail
        //     }
        // }

        case 'ENABLE_DARK_THEME': {
            return {
                ...state,
                theme: "dark",
            }
        }

        case 'ENABLE_LIGHT_THEME': {
            return {
                ...state,
                theme: "light",
            }
        }

        case 'USER_SERVER_LOGIN_SUCCESS': {
            return {
                ...state,
                visible: 'managemediapage',
                //userID: action.payload[0].user_id
            }
        }

        case 'USER_SERVER_LOGOUT_SUCCESS': {
            return {
                ...state,
                visible: 'loginpage',
            }
        }
        default:
            return state ;
	}
}