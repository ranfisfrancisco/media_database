import { useDispatch, useSelector } from 'react-redux';
import { Form, Input, Button, Table } from 'antd';

import { topBorrowedBooksBranch } from '../../actions/admin';

const topBorrowedBranchSelector = (state) => state.topBorrowedBranch;

const TopBorrowedBooksBranchPage = () => {

	const dispatch = useDispatch();
	const topBorrowedBranch = useSelector(topBorrowedBranchSelector);

	const topBorrowedBooksOnFinished = (value) => {
		dispatch(topBorrowedBooksBranch(value.maxBorrowers, value.branchNum));
	}

	const renderTopBorrowedBooks = () => {
		let dataSource = topBorrowedBranch.data;
		let columns = [
			{ title: 'Doc ID', dataIndex: 'DOCID' },
			{ title: 'Title', dataIndex: 'TITLE' },
			{ title: 'Amount Borrowed', dataIndex: 'COUNT(DOCID)' },
			{ title: 'Publisher ID', dataIndex: 'PUBLISHERID' },
			{ title: 'Publisher Name', dataIndex: 'PUBNAME' },
		];
		return <Table dataSource={dataSource} columns={columns} />;
	}

	const renderForm = () => {
		return (
			<Form onFinish={topBorrowedBooksOnFinished}>
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
			{renderTopBorrowedBooks()}
		</div>
	);
}

export default TopBorrowedBooksBranchPage;
