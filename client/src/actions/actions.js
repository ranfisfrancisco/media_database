import { message } from 'antd';

import api from './api/api';

export const userServerLogin = (userEmail) => async (dispatch) => {
	console.log('User Email '+userEmail)
	dispatch({ type: 'USER_SERVER_LOGIN' });
	let response;

	try {
		response = await api.post('/media_users', {
			user_email: userEmail
		});
	} catch(error) {
		console.log(error);
		dispatch({ type: 'USER_SERVER_LOGIN_FAILED' });
		return message.error('Query Error 1!');
	}
	if(response.data.message === 'USER_SERVER_LOGIN_SUCCESS') {
		dispatch({ type: 'USER_SERVER_LOGIN_SUCCESS', payload: response.data.result });
		return message.success('Logged in with server!');
	}
	dispatch({ type: 'USER_SERVER_LOGIN_FAILED' });
	return message.error('Query Error 2!');
}

export const createMedia = (userID, name, useDate, releaseDate, typeID, formatID, statusID) => async (dispatch) => {
	dispatch({ type: 'CREATE_MEDIA_REQUEST' });
	let response;

	try {
		response = await api.put('/media', {
			user_id: userID,
			name: (typeof(name) === 'string') ? name.trim() : name,
			use_date: (typeof(useDate) === 'string' && useDate.trim() !== "") ? useDate: null,
			release_date: (typeof(releaseDate) === 'string' && releaseDate.trim() !== "") ? releaseDate: null,
			type_id: (typeID !== -1) ? typeID : null,
			format_id: (formatID !== -1) ? formatID : null,
			status_id: (statusID !== -1) ? statusID : null
		});
	} catch(error) {
		console.log(error.message);
		dispatch({ type: 'CREATE_MEDIA_FAILED' });
		return message.error('Query Error 1!');
	}

	if(response.data.message === 'CREATE_MEDIA_SUCCESS') {
		dispatch({ type: 'UPDATE_MEDIA_SUCCESS', payload: response.data.result });
		return message.success('Created Item!');
	}

	dispatch({ type: 'CREATE_MEDIA_FAILED' });
	return message.error('Query Error 2!');
}

export const searchMedia = (userID, mediaID, name, useDateRange, releaseDateRange, typeID, formatID, statusID, exactNameSearch) => async (dispatch) => {
	dispatch({ type: 'GET_ALL_MEDIA_REQUEST' });
	let response;
	try {
		response = await api.get('/media', {
			params: {
				user_id: userID,
				media_id: mediaID,
				name: name,
				use_date_range: useDateRange,
				release_date_range: releaseDateRange,
				type_id: (typeID !== -1) ? typeID : null,
				format_id: (formatID !== -1) ? formatID : null,
				status_id: (statusID !== -1) ? statusID : null,
				exact_name_search: exactNameSearch
			}
		});
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

export const updateMedia = (mediaIdList, name, useDate, releaseDate, typeID, formatID, statusID) => async (dispatch) => {
	dispatch({ type: 'UPDATE_MEDIA_REQUEST' });
	let response;
	console.log(mediaIdList)

	try {
		response = await api.post('/media', {
			media_id_list: mediaIdList,
			name: (typeof(name) === 'string') ? name.trim() : name,
			use_date: (typeof(useDate) === 'string' && useDate.trim() !== "") ? useDate: null,
			release_date: (typeof(releaseDate) === 'string' && releaseDate.trim() !== "") ? releaseDate: null,
			type_id: (typeID !== -1) ? typeID : null,
			format_id: (formatID !== -1) ? formatID : null,
			status_id: (statusID !== -1) ? statusID : null
		});
	} catch(error) {
		console.log(error)
		dispatch({ type: 'UPDATE_MEDIA_FAILED' });
		return message.error('Query Error 1!');
	}
	if(response.data.message === 'UPDATE_MEDIA_SUCCESS') {
		dispatch({ type: 'UPDATE_MEDIA_SUCCESS', payload: response.data.result });
		return message.success('Updated!');
	}
	dispatch({ type: 'UPDATE_MEDIA_FAILED' });
	return message.error('Query Error 2!');
}

export const deleteMedia = (mediaIdList) => async (dispatch) => {
	dispatch({ type: 'DELETE_MEDIA_REQUEST' });
	let response;

	try {
		response = await api.delete('/media', {data: {
			media_id_list: mediaIdList}
		});
	} catch(error) {
		dispatch({ type: 'DELETE_MEDIA_FAILED' });
		return message.error(error.message);
	}
	if(response.data.message === 'DELETE_MEDIA_SUCCESS') {
		dispatch({ type: 'DELETE_MEDIA_SUCCESS', payload: response.data.result });
		return message.success('Deleted!');
	}
	dispatch({ type: 'DELETE_MEDIA_FAILED' });
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