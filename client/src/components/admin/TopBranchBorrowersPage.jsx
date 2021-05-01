import { useDispatch, useSelector } from 'react-redux';
import { Form, Input, Button, Table } from 'antd';

import { topBranchBorrowers } from '../../actions/admin';

const topBorrowersSelector = (state) => state.topBranchBorrowers;

const TopBranchBorrowersPage = () => {

	const dispatch = useDispatch();
	const topBorrowers = useSelector(topBorrowersSelector);

	const topBranchBorrowersOnFinished = (value) => {
		dispatch(topBranchBorrowers(value.branchNum, value.maxBorrowers));
	}

	const renderTopBorrowers = () => {
		let dataSource = topBorrowers.data;
		let columns = [
			{ title: 'Reader ID', dataIndex: 'RID' },
			{ title: 'Reader Name', dataIndex: 'RNAME' },
		];
		return <Table dataSource={dataSource} columns={columns} />;
	}

	const renderForm = () => {
		return (
			<Form onFinish={topBranchBorrowersOnFinished}>
				<Form.Item label='Branch ID:' name='branchNum'>
					<Input />
				</Form.Item>
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
			{renderTopBorrowers()}
		</div>
	);
}

export default TopBranchBorrowersPage;
