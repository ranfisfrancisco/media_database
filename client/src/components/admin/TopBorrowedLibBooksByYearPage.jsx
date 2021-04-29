import { useDispatch, useSelector } from 'react-redux';
import { Form, Input, Button, Table } from 'antd';

import { topBorrowedBooksLibByYear } from '../../actions/admin';

const TopBorrowedLibBooksByYearPage = () => {

	const dispatch = useDispatch();

	const topBorrowedOnFinished = (value) => {
		dispatch(topBorrowedBooksLibByYear(value.year));
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
		</div>
	);
}

export default TopBorrowedLibBooksByYearPage;
