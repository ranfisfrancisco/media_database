import { useDispatch, useSelector } from 'react-redux';
import { Form, Input, Button, Table } from 'antd';

import { topLibraryBorrowers } from '../../actions/admin';

const topLibraryBorrowersSelector = (state) => state.topLibraryBorrowers;

const TopLibraryBorrowersPage = () => {

	const dispatch = useDispatch();
	const topLibraryBorrowersData = useSelector(topLibraryBorrowersSelector);

	const topLibraryBorrowersOnFinished = (value) => {
		dispatch(topLibraryBorrowers(value.maxBorrowers));
	}

	const renderTopBorrowerInfo = () => {
		let dataSource = topLibraryBorrowersData.data;
		let columns = [
			{ title: 'Reader ID', dataIndex: 'RID' },
			{ title: 'Reader', dataIndex: 'RNAME' },
			{ title: 'Borrowed', dataIndex: 'COUNT(RID)' },
		];
		return <Table dataSource={dataSource} columns={columns} />;
	}

	const renderForm = () => {
		return (
			<Form onFinish={topLibraryBorrowersOnFinished}>
				<Form.Item label='Max Borrowers:' name='maxBorrowers'>
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
			{renderTopBorrowerInfo()}
		</div>
	);
}

export default TopLibraryBorrowersPage;
