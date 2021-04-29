import { useDispatch, useSelector } from 'react-redux';
import { Form, Input, Button, Table } from 'antd';

import { topBorrowedBooksLibrary } from '../../actions/admin';

const topBorrowedLibrarySelector = (state) => state.topBorrowedLibrary;

const TopBorrowedBooksLibraryPage = () => {

	const dispatch = useDispatch();
	const topBorrowedLibrary = useSelector(topBorrowedLibrarySelector);

	const topBorrowedLibraryBooksOnFinished = (value) => {
		dispatch(topBorrowedBooksLibrary(value.maxBorrow));
	}

	const renderTopBorrowedBooks = () => {
		let dataSource = topBorrowedLibrary.data;
		let columns = [
			{ title: 'Doc ID', dataIndex: 'DOCID' },
		];
		return <Table dataSource={dataSource} columns={columns} />;
	}

	const renderForm = () => {
		return (
			<Form onFinish={topBorrowedLibraryBooksOnFinished}>
				<Form.Item label='Max Borrowed:' name='maxBorrow'>
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

export default TopBorrowedBooksLibraryPage;
