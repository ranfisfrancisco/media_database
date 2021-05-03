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
		dispatch({ type: 'ADMIN_LOGIN_SUCCESS', payload: { adminId } });
		return message.success('Admin logged in!');
	}
	dispatch({ type: 'ADMIN_LOGIN_FAILED' });
	message.error('Error logging in!');
}

export const addDocCopy = (bId, docId, copyNo, position) => async (dispatch) => {
	dispatch({ type: 'ADMIN_ADD_DOC_COPY_REQUEST' });
	let response;
	let body = position ? { bId, docId, copyNo, position } : { bId, docId, copyNo };
	try {
		response = await admin.post('/add_doc', body);
	} catch(error) {
		dispatch({ type: 'AMDIN_ADD_DOC_COPY_FAILED' });
		return message.error('Error adding doc copy');
	}
	dispatch({ type: 'ADMIN_ADD_DOC_COPY_SUCCESS', payload: response.data.result });
	message.success('Document copy added!');
}

export const searchDoc = (bId, docId, copyNo) => async (dispatch) => {
	dispatch({ type: 'ADMIN_SEARCH_DOC_REQUEST' });
	let response;
	try {
		response = await admin.get(`/get_doc/${bId}/${docId}/${copyNo}`);
	} catch(error) {
		dispatch({ type: 'ADMIN_SEARCH_DOC_FAILED' });
		return message.error('Error searching for doc');
	}
	let result = response.data.result[0];
	result.borrowed = response.data.borrowed;
	result.reserved = response.data.reserved;
	dispatch({ type: 'ADMIN_SEARCH_DOC_SUCCESS', payload: [result] });
}

export const addReader = (rType, rName, rAddress, rPhone) => async (dispatch) => {
	dispatch({ type: 'ADMIN_ADD_READER_REQUEST' });
	let response;
	let body = { type: rType, name: rName, address: rAddress, phone: rPhone };
	try {
		response = await admin.post('/add_reader', body);
	} catch(error) {
		dispatch({ type: 'ADMIN_ADD_READER_FAILED' });
		return message.error('Error adding reader');
	}
	dispatch({ type: 'ADMIN_ADD_READER_SUCCESS', payload: response.data.result });
	message.success(`Reader added, Reader ID: ${response.data.result.insertId}`);
}

export const getBranchInfo = (bId) => async (dispatch) => {
	dispatch({ type: 'ADMIN_GET_BRANCH_INFO_REQUEST' });
	let response;
	try {
		response = await admin.get(`/branch_info/${bId}`);
	} catch(error) {
		dispatch({ type: 'ADMIN_GET_BRANCH_INFO_FAILED' });
		return message.error('Error getting branch info');
	}
	dispatch({ type: 'ADMIN_GET_BRANCH_INFO_SUCCESS', payload: response.data.result });
}

export const topBranchBorrowers = (branchNum, maxBorrowers) => async (dispatch) => {
	dispatch({ type: 'ADMIN_GET_TOP_BRANCH_BORROWERS_REQUEST' });
	let response;
	try {
		response = await admin.get(`/top_branch_borrowers/${branchNum}/${maxBorrowers}`);
	} catch(error) {
		dispatch({ type: 'ADMIN_GET_TOP_BRANCH_BORROWERS_FAILED' });
		return message.error('Error get top branch borrowers');
	}
	dispatch({ type: 'ADMIN_GET_TOP_BRANCH_BORROWERS_SUCCESS', payload: response.data.result });
}

export const topLibraryBorrowers = (maxBorrowers) => async (dispatch) => {
	dispatch({ type: 'ADMIN_GET_TOP_LIBRARY_BORROWERS_REQUEST' });
	let response;
	try {
		response = await admin.get(`/top_library_borrowers/${maxBorrowers}`);
	} catch(error) {
		dispatch({ type: 'ADMIN_GET_TOP_LIBRARY_BORROWERS_FAILED' });
		return message.error('Error getting top library borrowers');
	}
	dispatch({ type: 'ADMIN_GET_TOP_LIBRARY_BORROWERS_SUCCESS', payload: response.data.result });
}

export const topBorrowedBooksBranch = (maxBorrowers, branchNum) => async (dispatch) => {
	dispatch({ type: 'ADMIN_GET_TOP_BORROWED_BRANCH_REQUEST' });
	let response;
	try {
		response = await admin.get(`/top_borrowed_books_branch/${branchNum}/${maxBorrowers}`);
	} catch(error) {
		dispatch({ type: 'ADMIN_GET_TOP_BORROWED_BRANCH_FAILED' });
		return message.error('Error getting top borrowed books from branch');
	}
	dispatch({ type: 'ADMIN_GET_TOP_BORROWED_BRANCH_SUCCESS', payload: response.data.result });
}

export const topBorrowedBooksLibrary = (maxBorrow) => async (dispatch) => {
	dispatch({ type: 'ADMIN_GET_TOP_BORROWED_LIBRARY_REQUEST' });
	let response;
	try {
		response = await admin.get(`/top_borrowed_books_library/${maxBorrow}`);
	} catch(error) {
		dispatch({ type: 'ADMIN_GET_TOP_BORROWED_LIBRARY_FAILED' });
		return message.error('Error getting top borrowed books from library');
	}
	dispatch({ type: 'ADMIN_GET_TOP_BORROWED_LIBRARY_SUCCESS', payload: response.data.result });
}

export const topBorrowedBooksLibByYear = (year) => async (dispatch) => {
	dispatch({ type: 'ADMIN_GET_TOP_BORROWED_BOOKS_BY_YEAR_REQUEST' });
	let response;
	try {
		response = await admin.get(`/top_borrowed_books_library_by_year/${year}`);
	} catch(error) {
		dispatch({ type: 'ADMIN_GET_TOP_BORROWED_BOOKS_BY_YEAR_FAILED' });
		return message.error('Error getting top borrowed books from library by year');
	}
	dispatch({ type: 'ADMIN_GET_TOP_BORROWED_BOOKS_BY_YEAR_SUCCESS', payload: response.data.result });
}

export const averageBorrowingFine = (startDate, endDate) => async (dispatch) => {
	dispatch({ type: 'ADMIN_GET_AVG_FINE_REQUEST' });
	let response;
	try {
		response = await admin.get(`/avg_fine/${startDate}/${endDate}`);
	} catch(error) {
		dispatch({ type: 'ADMIN_GET_AVG_FINE_FAILED' });
		return message.error('Error getting avg fine');
	}
	dispatch({ type: 'ADMIN_GET_AVG_FINE_SUCCESS', payload: response.data.result });
}
