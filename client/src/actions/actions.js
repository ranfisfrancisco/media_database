import { message } from 'antd';

import api from './api/api';

export const searchForMedia = (id, name ,type_id, format_id, status_id, exactNameSearch) => async (dispatch) => {
	dispatch({ type: 'GET_ALL_MEDIA_REQUEST' });
	let response;
	try {
		let params = [
			{col: "id", val: id},
			{col: "name", val:name},
			{col: "type_ID", val:type_id},
			{col: "format_ID", val:format_id},
			{col: "status_ID", val:status_id},
			{col: "exactNameSearch", val:exactNameSearch}
		];
		let paramString = "?";

		for (var p of params){
			if (p.val !== undefined && p.val !== -1 && p.val !== ""){
				paramString += `${p.col}=${p.val}&`
			}
		}

		response = await api.get('/media' + paramString);
	} catch(error) {
		dispatch({ type: 'GET_MEDIA_FAILED' });
		return message.error('Query Error 1!');
	}
	if(response.data.message === 'GET_MEDIA_SUCCESS') {
		dispatch({ type: 'GET_MEDIA_SUCCESS', payload: response.data.result });
		return message.success('Got Result!');
	}
	dispatch({ type: 'GET_MEDIA_FAILED' });
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
		//return message.success('Got all media types');
		return;
	}
	dispatch({ type: 'GET_ALL_MEDIA_TYPES_FAILED' });
	return message.error('Query Error 2!');
}

export const getAllMediaFormats = () => async (dispatch) => {
	dispatch({ type: 'GET_ALL_MEDIA_FORMATS_REQUEST' });
	let response;
	try {
		response = await api.get('/media_formats');
	} catch(error) {
		dispatch({ type: 'GET_ALL_MEDIA_FORMATS_FAILED' });
		return message.error('Query Error 1!');
	}
	if(response.data.message === 'GET_ALL_MEDIA_FORMATS_SUCCESS') {
		dispatch({ type: 'GET_ALL_MEDIA_FORMATS_SUCCESS', payload: response.data.result });
		return;
	}
	dispatch({ type: 'GET_ALL_MEDIA_FORMATS_FAILED' });
	return message.error('Query Error 2!');
}

export const getAllMediaStatuses = () => async (dispatch) => {
	dispatch({ type: 'GET_ALL_MEDIA_STATUSES_REQUEST' });
	let response;
	try {
		response = await api.get('/media_statuses');
	} catch(error) {
		dispatch({ type: 'GET_ALL_MEDIA_STATUSES_FAILED' });
		return message.error('Query Error 1!');
	}
	if(response.data.message === 'GET_ALL_MEDIA_STATUSES_SUCCESS') {
		dispatch({ type: 'GET_ALL_MEDIA_STATUSES_SUCCESS', payload: response.data.result });
		return;
	}
	dispatch({ type: 'GET_ALL_MEDIA_STATUSES_FAILED' });
	return message.error('Query Error 2!');
}

// export const getAllAMedia = () => async (dispatch) => {
// 	dispatch({ type: 'GET_ALL_MEDIA_REQUEST' });
// 	let response;
// 	try {
// 		response = await api.get('/media');
// 	} catch(error) {
// 		dispatch({ type: 'GET_ALL_MEDIA_FAILED' });
// 		return message.error('Query Error 1!');
// 	}
// 	if(response.data.message === 'GET_ALL_MEDIA_SUCCESS') {
// 		dispatch({ type: 'GET_ALL_MEDIA_SUCCESS', payload: response.data.result });
// 		console.log("Success")
// 		return message.success('Got all media!');
// 	}
// 	dispatch({ type: 'GET_ALL_MEDIA_FAILED' });
// 	return message.error('Query Error 2!');
// }

// export const searchId = (mediaID) => async (dispatch) => {
// 	dispatch({ type: 'SEARCH_BY_ID_REQUEST' });
// 	let response;
// 	try {
// 		response = await api.get(`/media/id/${mediaID}`);
// 	} catch(error) {
// 		dispatch({ type: 'SEARCH_BY_ID_FAILED' });
// 		return message.error('Error searching by ID!');
// 	}
// 	dispatch({ type: 'SEARCH_BY_ID_SUCCESS', payload: response.data.result });
// 	return message.success('Got item by ID');
// }

// export const searchName = (mediaName) => async (dispatch) => {
// 	dispatch({ type: 'SEARCH_BY_NAME_REQUEST' });
// 	let response;
// 	try {
// 		response = await api.get(`/media/name/${mediaName}`);
// 	} catch(error) {
// 		dispatch({ type: 'SEARCH_BY_NAME_FAILED' });
// 		return message.error('Error searching by name!');
// 	}
// 	dispatch({ type: 'SEARCH_BY_NAME_SUCCESS', payload: response.data.result });
// 	return message.success('Got item by name');
// }

//TODO: get statuses and formats