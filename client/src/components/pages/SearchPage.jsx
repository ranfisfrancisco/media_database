import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect } from 'react';
import { Form, Input, Button, Table, Select } from 'antd';
import { searchForMedia, getAllMediaTypes } from '../../actions/actions';

const { Option } = Select;

const searchSelector = (state) => state.search;
const mediaTypesSelector = (state) => state.mediaTypes.data;

const SearchPage = () => {

	const dispatch = useDispatch();
	const search = useSelector(searchSelector);
    const mediaTypes = useSelector(mediaTypesSelector);
	const NOT_SELECTED = -1;
	var typeFilter = NOT_SELECTED;

	// const idOnFinished = (value) => {
	// 	dispatch(searchId(value.id));
	// }

	// const nameOnFinished = (value) => {
	// 	dispatch(searchName(value.name));
	// }

	const searchOnFinish = (value) => {
		console.log(value.id, value.name, typeFilter)
		dispatch(searchForMedia(value.id, value.name, typeFilter));
	}

    const filterTypeOnChange = (value) => {
		if (value === "None"){
			typeFilter = NOT_SELECTED;
			return;
		}

		for (const mediaType of mediaTypes){
			if (value === mediaType.type){
				typeFilter = mediaType.type_id;
				return;
			}
		}
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
				<Form.Item label='Search by ID:' name='id'>
					<Input />
				</Form.Item>
		);
	}

	const renderNameSearch = () => {
		return (
				<Form.Item label='Search by Name:' name='name'>
					<Input />
				</Form.Item>
		);
	}

    //TODO: Load Types from database and load results into here
    const renderFilterOptions = () => {

        var typeOptions = mediaTypes.map(function(typeObj, index){
            return <Option key={ typeObj.type }>{ typeObj.type }</Option>;
        });

        return (
				<Form.Item label='Filter by Type' name='typeFilter'>
                    <Select defaultValue="None" style={{ width: 120 }} onChange={filterTypeOnChange}>
						<Option key="None">None</Option>
                        { typeOptions }
                    </Select>
				</Form.Item>
		);
    }

	const renderSearchButton = () => {
		return (
				<Form.Item>
					<Button type='primary' htmlType='submit'>
						Submit
					</Button>
				</Form.Item>
		);
	}

	const renderSearchForm = () => {
		return (
			<Form onFinish={searchOnFinish}>
				{renderIdSearch()}
				{renderNameSearch()}
				{renderFilterOptions()}
				{renderSearchButton()}
				{renderSearchTable()}
			</Form>
		);
	}

    //load media types, statuses, formats once on page load
    useEffect(() => {
        dispatch(getAllMediaTypes());
    }, []);

	return (
		<div className='reader-content-wrapper'>
			{renderSearchForm()}
		</div>
	);
}

export default SearchPage;