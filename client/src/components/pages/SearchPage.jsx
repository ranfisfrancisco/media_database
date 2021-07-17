import { useDispatch, useSelector } from 'react-redux';
import { Form, Input, Button, Table, Select } from 'antd';

import { searchId, searchName } from '../../actions/actions';

const { Option } = Select;

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

    //TODO: Handle change
    const filterTypeOnChange = (value) => {
        console.log(`selected ${value}`);
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

    //TODO: Load Types from database and load results into here
    const renderFilterOptions = () => {
        return (
			<Form onFinish={filterTypeOnChange}>
				<Form.Item label='Filter by Type' name='typeFilter'>
                    <Select defaultValue="None" style={{ width: 120 }} onChange={filterTypeOnChange}>
                        <Option value="None">None</Option>
                        <Option value="Other">Other</Option>
                    </Select>
				</Form.Item>
			</Form>
		);
    }


	return (
		<div className='reader-content-wrapper'>
			{renderIdSearch()}
			{renderNameSearch()}
            {renderFilterOptions()}
			{renderSearchTable()}
		</div>
	);
}

export default SearchPage;