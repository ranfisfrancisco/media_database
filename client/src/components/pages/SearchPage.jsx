import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Table, Select } from 'antd';
import { searchForMedia, getAllMediaTypes, getAllMediaFormats, getAllMediaStatuses } from '../../actions/actions';

const { Option } = Select;

const searchSelector = (state) => state.search;
const mediaTypesSelector = (state) => state.mediaTypes.data;
const mediaFormatsSelector = (state) => state.mediaFormats.data;
const mediaStatusesSelector = (state) => state.mediaStatuses.data;

const SearchPage = () => {

	const dispatch = useDispatch();
	const search = useSelector(searchSelector);
    const mediaTypes = useSelector(mediaTypesSelector);
	const mediaFormats = useSelector(mediaFormatsSelector);
	const mediaStatuses = useSelector(mediaStatusesSelector);

	const NOT_SELECTED = -1;
	const NOT_SELECTED_TEXT = "All"
	const [typeFilter, setTypeFilter] = useState(NOT_SELECTED);
	const [formatFilter, setFormatFilter] = useState(NOT_SELECTED);
	const [statusFilter, setStatusFilter] = useState(NOT_SELECTED);

	// const idOnFinished = (value) => {
	// 	dispatch(searchId(value.id));
	// }

	// const nameOnFinished = (value) => {
	// 	dispatch(searchName(value.name));
	// }

	const searchOnFinish = (value) => {
		dispatch(searchForMedia(value.id, value.name, typeFilter, formatFilter, statusFilter));
	}

    const filterTypeOnChange = (value) => {
		if (value === NOT_SELECTED_TEXT){
			setTypeFilter(NOT_SELECTED);
			return;
		}

		for (const option of mediaTypes){
			if (value === option.type){
				setTypeFilter(option.type_id);
				return;
			}
		}
    }

	const filterFormatOnChange = (value) => {
		if (value === NOT_SELECTED_TEXT){
			setFormatFilter(NOT_SELECTED);
			return;
		}

		for (const option of mediaFormats){
			if (value === option.format){
				setFormatFilter(option.format_id);
				return;
			}
		}
    }

	const filterStatusOnChange = (value) => {
		if (value === NOT_SELECTED_TEXT){
			setStatusFilter(NOT_SELECTED);
			return;
		}

		for (const option of mediaStatuses){
			if (value === option.status){
				setStatusFilter(option.status_id);
				return;
			}
		}
	}

	const rowSelection = {
		onChange: (selectedRowKeys, selectedRows) => {
			console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
		// getCheckboxProps: record => ({
		// 	disabled: record.name === 'Disabled User', // Column configuration not to be checked
		// 	name: record.name,
		// })
	}};

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
		return <Table dataSource={dataSource} columns={columns} rowSelection={rowSelection} rowKey={record =>record.id}/>;
	}

	const renderIdSearch = () => {
		return (
				<Form.Item label='Search by ID:' name='id'>
					<Input  type="number"  />
				</Form.Item>
		);
	}

	const renderNameSearch = () => {
		return (
				<Form.Item label='Search by Name:' name='name'>
					<Input  />
				</Form.Item>
		);
	}

    //TODO: Load Types from database and load results into here
    const renderFilterOptions = () => {

        var typeOptions = mediaTypes.map(function(obj, index){
            return <Option key={ obj.type }>{ obj.type }</Option>;
        });

		var formatOptions = mediaFormats.map(function(obj, index){
            return <Option key={ obj.format }>{ obj.format }</Option>;
        });

		var statusOptions = mediaStatuses.map(function(obj, index){
            return <Option key={ obj.status }>{ obj.status }</Option>;
        });

        return (
			<Form>
				<Form.Item label='Filter by Type' name='typeFilter'>
                    <Select defaultValue={NOT_SELECTED_TEXT} style={{ width: 120 }} onChange={filterTypeOnChange}>
						<Option key={NOT_SELECTED_TEXT}>{NOT_SELECTED_TEXT}</Option>
                        { typeOptions }
                    </Select>
				</Form.Item>
				<Form.Item label='Filter by Format' name='formatFilter'>
                    <Select defaultValue={NOT_SELECTED_TEXT} style={{ width: 120 }} onChange={filterFormatOnChange}>
						<Option key={NOT_SELECTED_TEXT}>{NOT_SELECTED_TEXT}</Option>
                        { formatOptions }
                    </Select>
				</Form.Item>
				<Form.Item label='Filter by Status' name='statusFilter'>
                    <Select defaultValue={NOT_SELECTED_TEXT} style={{ width: 120 }} onChange={filterStatusOnChange}>
						<Option key={NOT_SELECTED_TEXT}>{NOT_SELECTED_TEXT}</Option>
                        { statusOptions }
                    </Select>
				</Form.Item>
			</Form>
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
		dispatch(getAllMediaFormats());
		dispatch(getAllMediaStatuses());
    }, []);

	return (
		<div className='reader-content-wrapper'>
			{renderSearchForm()}
		</div>
	);
}

export default SearchPage;