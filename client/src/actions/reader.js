import { message } from 'antd';

import reader from './api/reader';

export const readerLogin = (cardNumber) => async (dispatch) => {
	dispatch({ type: 'READER_LOGIN_REQUEST' });
	let response;
	let body = { cardNumber };
	try {
		response = await reader.post('/login', body);
	} catch(error) {
		dispatch({ type: 'READER_LOGIN_FAILED' });
		return message.error('Error logging in!');
	}
	if(response.data.message === 'LOGIN_SUCCESS') {
		dispatch({ type: 'READER_LOGIN_SUCCESS', payload: response.data.result[0] });
		return message.success('User logged in!');
	}
	dispatch({ type: 'READER_LOGIN_FAILED' });
	message.error('Error logging in!');
}

export const searchId = (docId) => async (dispatch) => {
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

export const searchTitle = (title) => async (dispatch) => {
	dispatch({ type: 'SEARCH_BY_TITLE_REQUEST' });
	let response;
	try {
		response = await reader.get(`/search/title/${title}`);	
	} catch(error) {
		dispatch({ type: 'SEARCH_BY_TITLE_FAILED' });
		return message.error('Error searching by title!');
	}
	dispatch({ type: 'SEARCH_BY_TITLE_SUCCESS', payload: response.data.result });
}

export const searchPublisher = (publisher) => async (dispatch) => {
	dispatch({ type: 'SEARCH_BY_PUBLISHER_REQUEST' });
	let response;
	try {
		response = await reader.get(`/search/publisher/${publisher}`);
	} catch(error) {
		dispatch({ type: 'SEARCH_BY_PUBLISHER_FAILED' });
		return message.error('Error searching by publisher!');
	}
	dispatch({ type: 'SEARCH_BY_PUBLISHER_SUCCESS', payload: response.data.result });
}

/*
export const checkout = (readerId, docId, copyNo, bId) => async (dispatch) => {
	dispatch({ type: 'CHECKOUT_REQUEST' });
	let response;
	let body = { readerId, docId, copyNo, bId };
}

export const returnDoc = (readerId, docId, copyNo, bId) => async (dispatch) => {

}

export const reserveDoc = (readerId, docId, copyNo, bId) => async (dispatch) => {

}

export const computeFine = (readerId, docId, copyNo, bId) => async (dispatch) => {
	
}

*/

export const getReserveDocs = (readerId) => async (dispatch) => {
	// /get_reserved/:readerId
	dispatch({ type: 'GET_RESERVED_DOCS_REQUEST' });
	let response;
	try {
		response = await reader.get(`/get_reserved/${readerId}`);
	} catch(error) {
		dispatch({ type: 'GET_RESERVED_DOCS_FAILED' });
		return message.error('Error getting reserved docs');
	}
	dispatch({ type: 'GET_RESERVED_DOCS_SUCCESS', payload: response.data.result });
}
export const getPublisherDocs = (publisher) => async (dispatch) => {
	dispatch({ type: 'GET_PUBLISHER_DOCS_REQUEST' });
	let response;
	try {
		response = await reader.get(`get_publisher_docs/${publisher}`);
	} catch(error) {
		dispatch({ type: 'GET_PUBLISHER_DOCS_FAILED' });
		return message.error('Error getting publisher docs!');
	}
	dispatch({ type: 'GET_PUBLISHER_DOCS_SUCCESS', payload: response.data.result });
}
