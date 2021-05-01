import { useDispatch, useSelector } from 'react-redux';
import { Form, Input, Button, Table } from 'antd';

import { checkout } from '../../actions/reader';

const readerSelector = (state) => state.page.reader;

const CheckoutPage = () => {

	const dispatch = useDispatch();
	const reader = useSelector(readerSelector);

	const checkoutOnFinished = (value) => {
		let readerId = reader.pid;
		let { docId, copyNo, bId } = value;
		dispatch(checkout(readerId, docId, copyNo, bId));
	}

	const renderForm = () => {
		return (
			<Form onFinish={checkoutOnFinished}>
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
	}

	return (
		<div className='reader-content-wrapper'>
			{renderForm()}
		</div>
	);
}

export default CheckoutPage;
