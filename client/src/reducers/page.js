const initState = {
	visible: 'homepage',
	reader: { 
		loading: false,
		pname: '',
		pid: '',
	},
	admin: { 
		loading: false 
	},
};

export default (state = initState, action) => {
	switch(action.type) {
		case 'READER_LOGIN_REQUEST': {
			return { 
				...state, 
				reader: {
					...state.reader,
					loading: true,
				}
			}
		}
		case 'READER_LOGIN_SUCCESS': {
			return { 
				...state, 
				reader: {
					...state.reader,
					loading: false,
					pname: action.payload.PNAME,
					pid: action.payload.PID
				},
				visible: 'reader',
			}
		}
		case 'READER_LOGIN_FAILED': {
			return { 
				...state, 
				reader: {
					...state.reader,
					loading: false,
				},
			}
		}
		case 'ADMIN_LOGIN_REQUEST': {
			return { 
				...state, 
				admin: {
					...state.admin,
					loading: true,
				}
			}
		}
		case 'ADMIN_LOGIN_SUCCESS': {
			return { 
				...state, 
				admin: {
					...state.admin,
					loading: false,
				},
				visible: 'admin',
			}
		}
		case 'ADMIN_LOGIN_FAILED': {
			return { 
				...state, 
				admin: {
					...state.admin,
					loading: false,
				},
			}
		}
		case 'LOGOUT': {
			return {
				...state,
				visible: 'homepage',
			}
		}
		default: {
			return state;
		}
	}
}
