import { useDispatch, useSelector } from 'react-redux';
import { Form, Input, Button, Table } from 'antd';

import { topBranchBorrowers } from '../../actions/admin';

const TopBranchBorrowersPage = () => {

	const dispatch = useDispatch();

	const topBranchBorrowersOnFinished = (value) => {
		dispatch(topBranchBorrowers(value.branchNum, value.maxBorrowers));
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
		</div>
	);
}

export default TopBranchBorrowersPage;
