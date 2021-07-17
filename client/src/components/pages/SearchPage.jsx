import { useDispatch, useSelector } from 'react-redux';
import { Form, Input, Button, Table } from 'antd';

import { searchId, searchName } from '../../actions/actions';

const searchSelector = (state) => state.search;

const SearchPage = () => {

	const dispatch = useDispatch();
	const search = useSelector(searchSelector);

	const idOnFinished = (value) => {
		dispatch(searchId(value.id));
	}

	const nameOnFinished = (value) => {
		dispatch(searchName(value.name));
	}

	const renderSearchTable = () => {
		let dataSource = search.data;
		let columns = [
			{ title: 'ID', dataIndex: 'id' },
			{ title: 'Name', dataIndex: 'name' },
			{ title: 'Release Date', dataIndex: 'releaseDate' },
			{ title: 'useDate', dataIndex: 'useDate' },
		];
		return <Table dataSource={dataSource} columns={columns} />;
	}

	const renderIdSearch = () => {
		return (
			<Form onFinish={idOnFinished}>
				<Form.Item label='Search by ID:' name='id'>
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

	const renderNameSearch = () => {
		return (
			<Form onFinish={nameOnFinished}>
				<Form.Item label='Search by Name:' name='name'>
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
		<div className='reader-content-wrapper'>
			{renderIdSearch()}
			{renderNameSearch()}
			{renderSearchTable()}
		</div>
	);
}

export default SearchPage;