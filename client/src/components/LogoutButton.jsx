import { useDispatch } from 'react-redux';
import { Button } from 'antd';

import { logout } from '../actions/auth';

const LogoutButton = ({ username }) => {

	const dispatch = useDispatch();
	const onLogoutClick = () => dispatch(logout());

	return (
		<div className='logout-button-wrapper'>
			<Button type='primary' onClick={onLogoutClick}>
				LOGOUT, {`${username}`}
			</Button>
		</div>
	);
}

export default LogoutButton;
