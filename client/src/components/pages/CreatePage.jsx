import { useDispatch, useSelector } from 'react-redux';
import { Form, Input, Button, Table } from 'antd';

import { searchForMedia } from '../../actions/actions';

const searchSelector = (state) => state.search;

const CreatePage = () => {

	const dispatch = useDispatch();
	const search = useSelector(searchSelector);

	const getAllAMediaOnFinish = () => {
		console.log("Running button")
		dispatch(searchForMedia());
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
			{ title: 'ID', dataIndex: 'id' },
			{ title: 'Name', dataIndex: 'name' },
			{ title: 'Release Date', dataIndex: 'releaseDate' },
			{ title: 'Use Date', dataIndex: 'useDate' },
            { title: 'Type', dataIndex: 'type' },
            { title: 'Format', dataIndex: 'format' },
            { title: 'Status', dataIndex: 'status' },
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

export default CreatePage;
