import { useDispatch, useSelector } from 'react-redux';
import { Form, Input, Button, Table } from 'antd';

import { getBranchInfo } from '../../actions/admin';

const branchInfoSelector = (state) => state.branchInfo;

const BranchInfoPage = () => {

	const dispatch = useDispatch();
	const branchInfo = useSelector(branchInfoSelector);

	const branchInfoOnFinished = (value) => {
		dispatch(getBranchInfo(value.bId));
	}

	const renderBranchInfo = () => {
		let dataSource = branchInfo.data;
		let columns = [
			{ title: 'Name', dataIndex: 'LNAME' },
			{ title: 'Location', dataIndex: 'ADDRESS' },
		];
		return <Table dataSource={dataSource} columns={columns} />
	}

	const renderForm = () => {
		return (
			<Form onFinish={branchInfoOnFinished}>
				<Form.Item label='Enter Branch ID:' name='bId'>
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
			{renderBranchInfo()}
		</div>
	);
}

export default BranchInfoPage;
