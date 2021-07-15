import { useDispatch, useSelector } from 'react-redux';
import { Form, Input, Button, Table } from 'antd';

import { getAllAMedia } from '../../actions/actions';

const GetAllPage = () => {
	const dispatch = useDispatch();

	const getAllAMediaOnFinish = () => {
		dispatch(getAllAMedia());
	}

	const renderForm = () => {
		return (
			<Button type='primary' htmlType='submit' onSubmit={getAllAMediaOnFinish}>
						Submit
			</Button>
		);
	}

	return (
		"HELLO"
		// <div className='user-content-wrapper'>
		// 	{renderForm()}
		// </div>
	);
}

export default GetAllPage;
