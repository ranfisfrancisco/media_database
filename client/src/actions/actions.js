import { message } from 'antd';

import api from './api/api';

export const getAllAMedia = () => async (dispatch) => {
	dispatch({ type: 'GET_ALL_MEDIA_REQUEST' });
	let response;
	try {
		response = await api.get('/media');
	} catch(error) {
		dispatch({ type: 'GET_ALL_MEDIA_FAILED' });
		return message.error('Query Error 1!');
	}
	if(response.data.message === 'GET_ALL_MEDIA_SUCCESS') {
		dispatch({ type: 'GET_ALL_MEDIA_SUCCESS', payload: response.data.result });
		console.log("Success")
		return message.success('Got all media!');
	}
	dispatch({ type: 'GET_ALL_MEDIA_FAILED' });
	return message.error('Query Error 2!');
}

export const getAllMediaTypes = () => async (dispatch) => {
	dispatch({ type: 'GET_ALL_MEDIA_TYPES_REQUEST' });
	let response;
	try {
		response = await api.get('/media_types');
	} catch(error) {
		dispatch({ type: 'GET_ALL_MEDIA_TYPES_FAILED' });
		return message.error('Query Error 1!');
	}
	if(response.data.message === 'GET_ALL_MEDIA_TYPES_SUCCESS') {
		dispatch({ type: 'GET_ALL_MEDIA_TYPES_SUCCESS', payload: response.data.result });
		console.log("Success")
		return message.success('Got all media types');
	}
	dispatch({ type: 'GET_ALL_MEDIA_TYPES_FAILED' });
	return message.error('Query Error 2!');
}

export const searchId = (mediaID) => async (dispatch) => {
	dispatch({ type: 'SEARCH_BY_ID_REQUEST' });
	let response;
	try {
		response = await api.get(`/media/id/${mediaID}`);
	} catch(error) {
		dispatch({ type: 'SEARCH_BY_ID_FAILED' });
		return message.error('Error searching by ID!');
	}
	dispatch({ type: 'SEARCH_BY_ID_SUCCESS', payload: response.data.result });
	return message.success('Got item by ID');
}

export const searchName = (mediaName) => async (dispatch) => {
	dispatch({ type: 'SEARCH_BY_NAME_REQUEST' });
	let response;
	try {
		response = await api.get(`/media/name/${mediaName}`);
	} catch(error) {
		dispatch({ type: 'SEARCH_BY_NAME_FAILED' });
		return message.error('Error searching by name!');
	}
	dispatch({ type: 'SEARCH_BY_NAME_SUCCESS', payload: response.data.result });
	return message.success('Got item by name');
}