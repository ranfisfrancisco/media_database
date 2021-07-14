import { useDispatch, useSelector } from 'react-redux';
import { Form, Input, Button, Table } from 'antd';

import { addDocCopy } from '../../actions/admin';

const AddDocPage = () => {

	const dispatch = useDispatch();

	const addDocOnFinished = (value) => {
		let { bId, docId, copyNo, position } = value;
		dispatch(addDocCopy(bId, docId, copyNo, position));
	}

	const renderForm = () => {
		return (
			<Form onFinish={addDocOnFinished}>
				<Form.Item label='Branch ID:' name='bId'>
					<Input />
				</Form.Item>
				<Form.Item label='Doc ID:' name='docId'>
					<Input />
				</Form.Item>
				<Form.Item label='Copy #:' name='copyNo'>
					<Input />
				</Form.Item>
				<Form.Item label='Position:' name='position'>
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

export default AddDocPage;
