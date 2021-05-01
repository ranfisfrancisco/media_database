import { useDispatch, useSelector } from 'react-redux';
import { Form, Input, Button, Table } from 'antd';

import { searchDoc } from '../../actions/admin';

const SearchDocPage = () => {

	const dispatch = useDispatch();

	const searchDocOnFinished = (value) => {
		let { bId, docId, copyNo } = value;
		dispatch(searchDoc(bId, docId, copyNo));
	}

	const renderForm = () => {
		return (
			<Form onFinish={searchDocOnFinished}>
				<Form.Item label='Branch ID:' name='bId'>
					<Input />
				</Form.Item>
				<Form.Item label='Doc ID:' name='docId'>
					<Input />
				</Form.Item>
				<Form.Item label='Copy #:' name='copyNo'>
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

export default SearchDocPage;
