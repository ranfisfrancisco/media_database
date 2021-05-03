import { useDispatch, useSelector } from 'react-redux';
import { Form, Input, Button, Table } from 'antd';

import { CheckCircleTwoTone, CloseCircleTwoTone } from '@ant-design/icons';

import { searchDoc } from '../../actions/admin';

const getDocCopySelector = (state) => state.getDocCopy;

const SearchDocPage = () => {

	const dispatch = useDispatch();
	const getDocCopy = useSelector(getDocCopySelector);

	const searchDocOnFinished = (value) => {
		let { bId, docId, copyNo } = value;
		dispatch(searchDoc(bId, docId, copyNo));
	}

	const renderTable = () => {
		let dataSource = getDocCopy.data;
		let columns = [
			{ title: 'Title', dataIndex: 'TITLE' },
			{ title: 'Publisher ID', dataIndex: 'PUBLISHERID' },
			{ 
				title: 'Borrowed', 
				dataIndex: 'borrowed',
				render: borrowedBool => borrowedBool ? <CheckCircleTwoTone twoToneColor='#32d95e'/> : <CloseCircleTwoTone twoToneColor='#e60b42' />,
			},
			{ 
				title: 'Reserved', 
				dataIndex: 'reserved',
				render: reservedBool => reservedBool ? <CheckCircleTwoTone twoToneColor='#32d95e'/> : <CloseCircleTwoTone twoToneColor='#e60b42' />,
			},
		];
		return <Table dataSource={dataSource} columns={columns} />;
	}

	const renderForm = () => {
		return (
			<Form onFinish={searchDocOnFinished}>
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
		<div className='admin-content-wrapper'>
			{renderForm()}
			{renderTable()}
		</div>
	);
}

export default SearchDocPage;
