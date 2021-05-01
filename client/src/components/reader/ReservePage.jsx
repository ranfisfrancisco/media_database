import { useDispatch, useSelector } from 'react-redux';
import { Form, Input, Button, Table } from 'antd';

import { reserveDoc } from '../../actions/reader';

const readerSelector = (state) => state.page.reader;

const ReservePage = () => {

	const dispatch = useDispatch();
	const reader = useSelector(readerSelector);

	const reserveOnFinished = (value) => {
		let readerId = reader.pid;
		let { docId, copyNo, bId } = value;
		dispatch(reserveDoc(readerId, docId, copyNo, bId));
	}

	const renderForm = () => (
		<Form onFinish={reserveOnFinished}>
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

export default ReservePage;
