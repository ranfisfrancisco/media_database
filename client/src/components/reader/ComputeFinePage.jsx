import { useDispatch, useSelector } from 'react-redux';
import { Form, Input, Button, Table } from 'antd';

import { computeFine } from '../../actions/reader';

const readerSelector = (state) => state.page.reader;

const ComputeFinePage = () => {

	const dispatch = useDispatch();
	const reader = useSelector(readerSelector);

	const computeOnFinished = (value) => {
		let readerId = reader.pid;
		let { docId, copyNo, bId } = value;
		dispatch(computeFine(readerId, docId, copyNo, bId));
	}

	const renderForm = () => (
		<Form onFinish={computeOnFinished}>
			<Form.Item label='Doc ID:' name='docId'>
				<Input />
			</Form.Item>
			<Form.Item label='Copy #:' name='copyNo'>
				<Input />
			</Form.Item>
			<Form.Item label='Branch ID:' name='bId'>
				<Input />
			</Form.Item>
			<Form.Item> 
				<Button type='primary' htmlType='submit'>
					Submit
				</Button>
			</Form.Item>
		</Form>
	);

	return (
		<div className='reader-content-wrapper'>
			{renderForm()}
		</div>
	);
}

export default ComputeFinePage;
