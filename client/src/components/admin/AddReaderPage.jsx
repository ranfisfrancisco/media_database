import { useDispatch, useSelector } from 'react-redux';
import { Form, Input, Button, Table } from 'antd';

import { addReader } from '../../actions/admin';

const AddReaderPage = () => {

	const dispatch = useDispatch();

	const addReaderOnFinished = (value) => {
		let { type, name, address, phone } = value;
		dispatch(addReader(type, name, address, phone));
	}

	const renderForm = () => {
		return (
			<Form onFinish={addReaderOnFinished}>
				<Form.Item label='Type:' name='type'>
					<Input />
				</Form.Item>
				<Form.Item label='Name:' name='name'>
					<Input />
				</Form.Item>
				<Form.Item label='Address:' name='address'>
					<Input />
				</Form.Item>
				<Form.Item label='Phone #:' name='phone'>
					<Input />
				</Form.Item>
				<Form.Item>
					<Button type='primary' htmlType='submit'>
						Submit
					</Button>
				</Form.Item>
			</Form>
		);
	}

	return (
		<div className='admin-content-wrapper'>
			{renderForm()}
		</div>
	);
}

export default AddReaderPage;
