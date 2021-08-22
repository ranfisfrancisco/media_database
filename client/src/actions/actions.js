import { message } from 'antd';

import api from './api/api';

const API_KEY = process.env.REACT_APP_API_KEY;

export const userServerLogin = (userEmail, idToken) => async (dispatch) => {
	dispatch({ type: 'USER_SERVER_LOGIN' });
	let response;

	try {
		response = await api.post('/media_users', {
			user_email: userEmail,
			id_token: idToken,
			api_key: API_KEY
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

export const userServerLogout = () => async (dispatch) => {
	let response;
	dispatch({ type: 'USER_SERVER_LOGOUT_SUCCESS'});
	try {
		response = await api.post('/media_users/logout', {
		});
	} catch(error) {
		console.log(error);
		dispatch({ type: 'USER_SERVER_LOGOUT_FAILED' });
		return message.error('Query Error 1!');
	}
	if(response.data.message === 'USER_SERVER_LOGOUT_SUCCESS') {
		return message.success('Logged out of server!');
	}
	dispatch({ type: 'USER_SERVER_LOGOUT_FAILED' });
	return message.error('Query Error 2!');
}

export const createMedia = (name, useDate, releaseDate, typeID, ownershipID, statusID) => async (dispatch) => {
	dispatch({ type: 'CREATE_MEDIA_REQUEST' });
	let response;

	try {
		response = await api.put('/media', {
			name: (typeof(name) === 'string') ? name.trim() : name,
			use_date: (typeof(useDate) === 'string' && useDate.trim() !== "") ? useDate: null,
			release_date: (typeof(releaseDate) === 'string' && releaseDate.trim() !== "") ? releaseDate: null,
			type_id: (typeID !== -1) ? typeID : null,
			ownership_id: (ownershipID !== -1) ? ownershipID : null,
			status_id: (statusID !== -1) ? statusID : null,
			api_key: API_KEY
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

export const searchMedia = (mediaID, name, useDateRange, releaseDateRange, typeID, ownershipID, statusID, exactNameSearch, filterNullReleaseDate, filterNullUseDate) => async (dispatch) => {
	dispatch({ type: 'GET_ALL_MEDIA_REQUEST' });
	let response;

	try {
		response = await api.get('/media', {
			params: {
				media_id: mediaID,
				name: name,
				use_date_range: useDateRange,
				release_date_range: releaseDateRange,
				type_id: typeID,
				ownership_id: ownershipID,
				status_id: statusID,
				exact_name_search: exactNameSearch,
				filter_null_release_date: filterNullReleaseDate,
				filter_null_use_date: filterNullUseDate,
				api_key: API_KEY
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

export const updateMedia = (mediaIdList, name, useDate, releaseDate, typeID, ownershipID, statusID) => async (dispatch) => {
	dispatch({ type: 'UPDATE_MEDIA_REQUEST' });
	let response;

	try {
		response = await api.post('/media', {
			media_id_list: mediaIdList,
			name: (typeof(name) === 'string') ? name.trim() : name,
			use_date: (typeof(useDate) === 'string' && useDate.trim() !== "") ? useDate: null,
			release_date: (typeof(releaseDate) === 'string' && releaseDate.trim() !== "") ? releaseDate: null,
			type_id: (typeID !== -1) ? typeID : null,
			ownership_id: (ownershipID !== -1) ? ownershipID : null,
			status_id: (statusID !== -1) ? statusID : null,
			api_key: API_KEY
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
			media_id_list: mediaIdList,
			api_key: API_KEY
		}});
	} catch(error) {
		console.log(error)
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
		response = await api.get('/media_types', {
			params: {
				api_key: API_KEY
			}
		});
	} catch(error) {
		console.log(error)
		dispatch({ type: 'GET_ALL_MEDIA_TYPES_FAILED' });
		return message.error('Query Error 1!');
	}
	if(response.data.message === 'GET_ALL_MEDIA_TYPES_SUCCESS') {
		dispatch({ type: 'GET_ALL_MEDIA_TYPES_SUCCESS', payload: response.data.result });
		return;
	}
	dispatch({ type: 'GET_ALL_MEDIA_TYPES_FAILED' });
	return message.error('Query Error 2!');
}

export const getAllMediaOwnerships = () => async (dispatch) => {
	dispatch({ type: 'GET_ALL_MEDIA_OWNERSHIPS_REQUEST' });
	let response;
	try {
		response = await api.get('/media_ownerships', {
			params: {
				api_key: API_KEY
			}
		});
	} catch(error) {
		console.log(error)
		dispatch({ type: 'GET_ALL_MEDIA_OWNERSHIPS_FAILED' });
		return message.error('Query Error 1!');
	}
	if(response.data.message === 'GET_ALL_MEDIA_OWNERSHIPS_SUCCESS') {
		dispatch({ type: 'GET_ALL_MEDIA_OWNERSHIPS_SUCCESS', payload: response.data.result });
		return;
	}
	dispatch({ type: 'GET_ALL_MEDIA_OWNERSHIPS_FAILED' });
	return message.error('Query Error 2!');
}

export const getAllMediaStatuses = () => async (dispatch) => {
	dispatch({ type: 'GET_ALL_MEDIA_STATUSES_REQUEST' });
	let response;
	try {
		response = await api.get('/media_statuses', {
			params: {
				api_key: API_KEY
			}
		});
	} catch(error) {
		console.log(error)
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