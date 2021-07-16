import { message } from 'antd';

import api from './api/api';

export const getAllAMedia = () => async (dispatch) => {
	dispatch({ type: 'GET_ALL_REQUEST' });
	let response;
	try {
		response = await api.get('/media');
	} catch(error) {
		dispatch({ type: 'GET_MEDIA_FAILED' });
		return message.error('Query Error 1!');
	}
	if(response.data.message === 'GET_ALL_SUCCESS') {
		dispatch({ type: 'GET_ALL_SUCCESS', payload: response.data.result });
		console.log("Success")
		return message.success('Got all media!');
	}
	dispatch({ type: 'GET_MEDIA_FAILED' });
	return message.error('Query Error 2!');
}

export const searchId = () => async (dispatch) => {
	dispatch({ type: 'SEARCH_BY_ID_REQUEST' });
	let response;
	try {
		response = await reader.get(`/search/id/${docId}`);
	} catch(error) {
		dispatch({ type: 'SEARCH_BY_ID_FAILED' });
		return message.error('Error searching by ID!');
	}
	dispatch({ type: 'SEARCH_BY_ID_SUCCESS', payload: response.data.result });
}