import { useDispatch, useSelector } from 'react-redux';
import { Form, Input, Button } from 'antd';

import { readerLogin } from '../actions/reader';
import { adminLogin } from '../actions/admin';

import AdminPage from './admin';
import ReaderPage from './reader';

import './css/App.css';

const pageSelector = (state) => state.page;

// add form validation rules later
const App = () => {

	const dispatch = useDispatch();
	const page = useSelector(pageSelector);

	const renderPage = () => {
		if(page.visible === 'homepage') {
			return (
				<div className='homepage-wrapper'>
					{renderReaderLogin()}
					{renderAdminLogin()}
				</div>
			);
		} else if(page.visible === 'admin') {
			return <AdminPage />;
		} else if(page.visible === 'reader') {
			return <ReaderPage />;
		}
	}

	const readerOnFinished = (value) => {
		dispatch(readerLogin(value.cardNumber));
	}

	const adminOnFinished = (value) => {
		dispatch(adminLogin(value.id, value.password));
	}

	const renderReaderLogin = () => (
		<div className='reader-login-wrapper'>
			<Form onFinish={readerOnFinished}>
				<Form.Item label='Card Number:' name='cardNumber'>
					<Input />
				</Form.Item>
				<Form.Item>
					<Button type='primary' htmlType='submit'>
						Submit
					</Button>
				</Form.Item>
			</Form>
		</div>
	);

	const renderAdminLogin = () => (
		<div className='admin-login-wrapper'>
			<Form onFinish={adminOnFinished}>
				<Form.Item label='Admin ID' name='id'>
					<Input />
				</Form.Item>
				<Form.Item label='Password' name='password'>
					<Input.Password />
				</Form.Item>
				<Form.Item>
					<Button type='primary' htmlType='submit'>
						Submit
					</Button>
				</Form.Item>
			</Form>
		</div>
	);


	return (
		<div className='app-wrapper'>
			{renderPage()}
		</div>
	);
};

export default App;
