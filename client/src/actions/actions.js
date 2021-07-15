import { message } from 'antd';

import api from './api/api';

export const getAllAMedia = () => async (dispatch) => {
	dispatch({ type: 'READER_LOGIN_REQUEST' });
	let response;
	try {
		response = await api.get('/media');
	} catch(error) {
		dispatch({ type: 'GET_MEDIA_FAILED' });
		return message.error('Query Error!');
	}
	if(response.data.message === 'GET_ALL_SUCCESS') {
		dispatch({ type: 'GET_ALL_SUCCESS', payload: response.data.result[0] });
		return message.success('Got all media!');
	}
	dispatch({ type: 'GET_MEDIA_FAILED' });
	return message.error('Query Error!');
}
