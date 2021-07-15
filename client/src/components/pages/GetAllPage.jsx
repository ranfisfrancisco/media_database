import { useDispatch, useSelector } from 'react-redux';
import { Form, Input, Button, Table } from 'antd';

import { getAllAMedia } from '../../actions/actions';

const searchSelector = (state) => state.search;

const GetAllPage = () => {

	const dispatch = useDispatch();
	const search = useSelector(searchSelector);

	const getAllAMediaOnFinish = () => {
		console.log("Running button")
		dispatch(getAllAMedia());
	}

	const renderForm = () => {
		return (
			<Button onClick={getAllAMediaOnFinish}>
						Submit
			</Button>
		);
	}

	const renderSearchTable = () => {
		let dataSource = search.data;
		let columns = [
			{ title: 'Name', dataIndex: 'name' },
		];
		return <Table dataSource={dataSource} columns={columns} />;
	}

	return (
		<div className='user-content-wrapper'>
		 	{renderForm()}
			{renderSearchTable()}
		</div>
	);
}

export default GetAllPage;
