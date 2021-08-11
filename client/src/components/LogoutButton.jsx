import React from 'react';
import { useDispatch } from 'react-redux';
import { Button } from 'antd';
import { useGoogleLogout } from 'react-google-login';
import { userServerLogout } from '../actions/actions';

const REACT_APP_GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;

const LogoutButton = () => {

	const dispatch = useDispatch();

	const onLogoutSuccess = (res) => {
		console.log('Logged out Success');
	  };
	  
	  const onLogoutFailure = () => {
		console.log('Failed to Log Out');
	  };
	  
	  const { signOut } = useGoogleLogout({
		REACT_APP_GOOGLE_CLIENT_ID,
		onLogoutSuccess,
		onLogoutFailure,
	  });
	
	const onLogoutClick = () => {
		dispatch({ type: 'USER_LOGOUT'});
		dispatch(userServerLogout());
		signOut();
	}
	
	return (
		<div className='logout-button-wrapper'>
			<Button type='primary' onClick={onLogoutClick}>
				Log Out
			</Button>
		</div>
	);
}

export default LogoutButton;
