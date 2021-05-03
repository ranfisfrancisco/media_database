import { useDispatch, useSelector } from 'react-redux';
import { Form, Input, Button, Table } from 'antd';

import { computeFine } from '../../actions/reader';

const readerSelector = (state) => state.page.reader;
const computeFineSelector = (state) => state.computeFine;

const ComputeFinePage = () => {

	const dispatch = useDispatch();
	const reader = useSelector(readerSelector);
	const computeFineData = useSelector(computeFineSelector);

	const computeOnFinished = (value) => {
		let readerId = reader.pid;
		let { docId, copyNo, bId } = value;
		dispatch(computeFine(readerId, docId, copyNo, bId));
	}

	const renderTable = () => {
		let dataSource = computeFineData.data;
		let columns = [
			{ title: 'Title', dataIndex: 'TITLE' },
			{ title: 'Fine', dataIndex: 'FINES' },
			{ title: 'Borrow Date', dataIndex: 'BDTIME' },
		];
		return <Table dataSource={dataSource} columns={columns} />;
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
			{renderTable()}
		</div>
	);
}

export default ComputeFinePage;
