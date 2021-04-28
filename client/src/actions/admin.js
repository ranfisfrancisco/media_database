import { message } from 'antd';

import admin from './api/admin';

export const adminLogin = (adminId, password) => async (dispatch) => {
	dispatch({ type: 'ADMIN_LOGIN_REQUEST' });
	let response;
	let body = { adminId, password };
	try {
		response = await admin.post('/login', body);
	} catch(error) {
		dispatch({ type: 'ADMIN_LOGIN_FAILED' });
		return message.error('Error logging in!');
	}
	if(response.data.message === 'LOGIN_SUCCESS') {
		dispatch({ type: 'ADMIN_LOGIN_SUCCESS' });
		return message.success('Admin logged in!');
	}
	dispatch({ type: 'ADMIN_LOGIN_FAILED' });
	message.error('Error logging in!');
}
