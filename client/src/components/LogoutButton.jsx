import { useDispatch } from 'react-redux';
import { Button } from 'antd';

import { logout } from '../actions/auth';

const LogoutButton = () => {

	const dispatch = useDispatch();
	const onLogoutClick = () => dispatch(logout());

	return (
		<div className='logout-button-wrapper'>
			<Button type='primary' onClick={onLogoutClick}>
				LOGOUT
			</Button>
		</div>
	);
}

export default LogoutButton;
