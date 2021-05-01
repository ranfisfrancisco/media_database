import { useDispatch, useSelector } from 'react-redux';
import { Form, Input, Button, Table } from 'antd';

import { topBorrowedBooksLibByYear } from '../../actions/admin';

const topLibBooksByYearSelector = (state) => state.topLibBooksByYear;

const TopBorrowedLibBooksByYearPage = () => {

	const dispatch = useDispatch();
	const topLibBooksByYear = useSelector(topLibBooksByYearSelector);

	const topBorrowedOnFinished = (value) => {
		dispatch(topBorrowedBooksLibByYear(value.year));
	}

	const renderTopBooks = () => {
		let dataSource = topLibBooksByYear.data;
		let columns = [
			{ title: 'Doc ID', dataIndex: 'DOCID' },
		];
		return <Table dataSource={dataSource} columns={columns} />;
	}

	const renderForm = () => {
		return (
			<Form onFinish={topBorrowedOnFinished}>
				<Form.Item label='Year:' name='year'>
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
			{renderTopBooks()}
		</div>
	);
}

export default TopBorrowedLibBooksByYearPage;
