import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Table, Select, Checkbox } from 'antd';
import { searchForMedia, updateMedia, getAllMediaTypes, getAllMediaFormats, getAllMediaStatuses } from '../../actions/actions';

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

	const NOT_SELECTED_ID = -1;
	const NOT_SELECTED_TEXT = "All"
	const [exactNameSearch, setExactNameSearch] = useState(false);

	const [typeFilter, setTypeFilter] = useState(NOT_SELECTED_ID);
	const [formatFilter, setFormatFilter] = useState(NOT_SELECTED_ID);
	const [statusFilter, setStatusFilter] = useState(NOT_SELECTED_ID);
	const [typeUpdate, setTypeUpdate] = useState(NOT_SELECTED_ID);
	const [formatUpdate, setFormatUpdate] = useState(NOT_SELECTED_ID);
	const [statusUpdate, setStatusUpdate] = useState(NOT_SELECTED_ID);

	const [selectedRows, setSelectedRows] = useState([]); // Attatched to table to determine and read what the user has clicked on
	const [selectedRowKeys, setSelectedRowKeys] = useState([]);

	const searchFormOnFinish = (value) => {
		setSelectedRows([]);
		dispatch(searchForMedia(value.id, value.name, typeFilter, formatFilter, statusFilter, exactNameSearch));
	}

    const filterTypeOnChange = (value) => {
		if (value === NOT_SELECTED_TEXT){
			setTypeFilter(NOT_SELECTED_ID);
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
			setFormatFilter(NOT_SELECTED_ID);
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
			setStatusFilter(NOT_SELECTED_ID);
			return;
		}

		for (const option of mediaStatuses){
			if (value === option.status){
				setStatusFilter(option.status_id);
				return;
			}
		}
	}

	const updateTypeOnChange = (value) => {
		if (value === NOT_SELECTED_TEXT){
			setTypeUpdate(NOT_SELECTED_ID);
			return;
		}

		for (const option of mediaTypes){
			if (value === option.type){
				setTypeUpdate(option.type_id);
				return;
			}
		}
    }

	const updateFormatOnChange = (value) => {
		if (value === NOT_SELECTED_TEXT){
			setFormatUpdate(NOT_SELECTED_ID);
			return;
		}

		for (const option of mediaFormats){
			if (value === option.format){
				setFormatUpdate(option.format_id);
				return;
			}
		}
    }

	const updateStatusOnChange = (value) => {
		if (value === NOT_SELECTED_TEXT){
			setStatusUpdate(NOT_SELECTED_ID);
			return;
		}

		for (const option of mediaStatuses){
			if (value === option.status){
				setStatusUpdate(option.status_id);
				return;
			}
		}
	}

	const renderIdEntry = () => {
		return (
				<Form.Item label='Search by ID:' name='id'>
					<Input  type="number"  />
				</Form.Item>
		);
	}

	const renderNameEntry = (labelText) => {
		return (
				<Form.Item label={labelText} name='name'>
					<Input  />
				</Form.Item>
		);
	}

	const onSearchToggleChange = (e) => {
		setExactNameSearch(e.target.checked)
	}

	const renderSearchToggle = () => {
		return (
			<Checkbox onChange={onSearchToggleChange}>Find Exact Name</Checkbox>
		);
	}

	const renderSearchOptions = () => {
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
			<div>
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
			</div>
		);
    }

	const renderSubmitButton = (buttonText) => {
		return (
				<Form.Item>
					<Button type='primary' htmlType='submit'>
						{buttonText}
					</Button>
				</Form.Item>
		);
	}

	const renderSearchForm = () => {
		return(
			<Form onFinish={searchFormOnFinish}>
					{renderIdEntry()}
					{renderNameEntry("Search by Name:")}
					{renderSearchToggle()}
					{renderSearchOptions()}
					{renderSubmitButton("Search")}
			</Form>
		);
	}

	const updateFormOnFinish = (value) => {
		if (selectedRows.length > 1 && value.name !== ""){
			alert("You cannot change the names of multiple items to the same name!")
			return;
		}

		let selectedIDList = selectedRows.map(function(row){
			return row.id;
		})

		dispatch(updateMedia(selectedIDList, value.name, typeUpdate, formatUpdate, statusUpdate));
	}

	const renderUpdateOptions = () => {
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
			<div>
				<Form.Item label='Change Type' name='typeFilter'>
                    <Select defaultValue={NOT_SELECTED_TEXT} style={{ width: 120 }} onChange={updateTypeOnChange}>
						<Option key={NOT_SELECTED_TEXT}>No Change</Option>
                        { typeOptions }
                    </Select>
				</Form.Item>
				<Form.Item label='Change Format' name='formatFilter'>
                    <Select defaultValue={NOT_SELECTED_TEXT} style={{ width: 120 }} onChange={updateFormatOnChange}>
						<Option key={NOT_SELECTED_TEXT}>No Change</Option>
                        { formatOptions }
                    </Select>
				</Form.Item>
				<Form.Item label='Change Status' name='statusFilter'>
                    <Select defaultValue={NOT_SELECTED_TEXT} style={{ width: 120 }} onChange={updateStatusOnChange}>
						<Option key={NOT_SELECTED_TEXT}>No Change</Option>
                        { statusOptions }
                    </Select>
				</Form.Item>
			</div>
		);
	}

	const renderUpdateForm = () => {
		return (
			<Form onFinish={updateFormOnFinish}>
					{renderNameEntry("Change Name:")}
					{renderUpdateOptions()}
					{renderSubmitButton("Update Selected Items")}
			</Form>
		);
	}

	const rowSelection = {
		selectedRowKeys,
		onChange: (selectedRowKeys, rows) => {
			setSelectedRowKeys(selectedRowKeys);
			setSelectedRows(rows);
	}};

	const clearSelectedButtonOnClick = () =>{
		setSelectedRowKeys([]);
		setSelectedRows([]);
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
		return (
		<div>
			<Button onClick={clearSelectedButtonOnClick}>Clear Selected</Button>
			<Table dataSource={dataSource} columns={columns} rowSelection={rowSelection} rowKey={record =>record.id}/>
		</div>
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
			{renderUpdateForm()}
			{renderSearchTable()}
		</div>
	);
}

export default SearchPage;