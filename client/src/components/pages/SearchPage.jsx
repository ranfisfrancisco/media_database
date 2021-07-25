import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Table, Select, Checkbox, DatePicker } from 'antd';
import { searchForMedia, updateMedia, deleteMedia, getAllMediaTypes, getAllMediaFormats, getAllMediaStatuses } from '../../actions/actions';

const { Option } = Select;
const { RangePicker } = DatePicker;

const searchSelector = (state) => state.search;
const mediaTypesSelector = (state) => state.mediaTypes.data;
const mediaFormatsSelector = (state) => state.mediaFormats.data;
const mediaStatusesSelector = (state) => state.mediaStatuses.data;

const SearchPage = () => {

	const dispatch = useDispatch();
	const searchResult = useSelector(searchSelector);
    const mediaTypes = useSelector(mediaTypesSelector);
	const mediaFormats = useSelector(mediaFormatsSelector);
	const mediaStatuses = useSelector(mediaStatusesSelector);

	const NOT_SELECTED_ID = -1;
	const NOT_SELECTED_TEXT = "All"

	const [searchForm] = Form.useForm();
	const [updateForm] = Form.useForm();

	const [selectedRows, setSelectedRows] = useState([]); 
	const [selectedRowKeys, setSelectedRowKeys] = useState([]); // Attatched to table to determine and read what the user has clicked on

	const returnMomentDateRangeStrings = (start, finish) => {
		return [start.format('YYYY-MM-DD'), finish.format('YYYY-MM-DD')];
	};

	const processDateRange = (dateRange) => {
		if (dateRange === undefined || dateRange === null){
			return null;
		} 
		return returnMomentDateRangeStrings(dateRange[0], dateRange[1]);
	}

	const valueToColID = (value, options) => {
		if (value === undefined || value === NOT_SELECTED_TEXT || value === null){
			return NOT_SELECTED_ID;
		}

		for (const option of options){
			if (value === option.option){
				return option.id;
			}
		}

		console.log("Failed to map Select option to corresponding ID >> \n", value, "\n", options);
		return NOT_SELECTED_ID;
	}

	const searchFormOnFinish = () => {
		let id = searchForm.getFieldValue("id")
		let name = searchForm.getFieldValue("name")
		let useDateRange = processDateRange(searchForm.getFieldValue("useDate"));
		let releaseDateRange = processDateRange(searchForm.getFieldValue("releaseDate"));
		let typeFilter =  valueToColID(searchForm.getFieldValue("typeFilter"), mediaTypes);
		let formatFilter = valueToColID(searchForm.getFieldValue("formatFilter"), mediaFormats);
		let statusFilter = valueToColID(searchForm.getFieldValue("statusFilter"), mediaStatuses);
		let exactNameSearch = searchForm.getFieldValue("exactNameSearch");

		dispatch(searchForMedia(id, name, useDateRange, releaseDateRange, typeFilter,
		  formatFilter, statusFilter, exactNameSearch));

		console.log(id, name, useDateRange, releaseDateRange, typeFilter,
		 	formatFilter, statusFilter, exactNameSearch);

		deselectRows();
	}

	const clearSelectForm = () => {
		searchForm.resetFields();
	}

	const renderSearchForm = () => {
        var typeOptions = mediaTypes.map(function(obj, index){
            return <Option key={ obj.option }>{ obj.option }</Option>;
        });

		var formatOptions = mediaFormats.map(function(obj, index){
            return <Option key={ obj.option }>{ obj.option }</Option>;
        });

		var statusOptions = mediaStatuses.map(function(obj, index){
            return <Option key={ obj.option }>{ obj.option }</Option>;
        });

        return (
			<Form onFinish={searchFormOnFinish} id="search-form" form={searchForm}>
				<Form.Item label='Search by ID:'  name='id'>
					<Input type="number" name='id' />
				</Form.Item>

				<Form.Item label="Search by Name" name='name'>
					<Input  />
				</Form.Item>

				<Form.Item name='exactNameSearch' valuePropName='checked'>
					<Checkbox >Find Exact Name</Checkbox>
				</Form.Item>

				<label>Use Date</label>
				<Form.Item name='useDate'>
					<RangePicker/>
				</Form.Item>

				<label>Release Date</label>
				<Form.Item name='releaseDate'>
					<RangePicker/>
				</Form.Item>

				<Form.Item label='Filter by Type' name='typeFilter'>
                    <Select defaultValue={NOT_SELECTED_TEXT} style={{ width: 120 }}>
						<Option key={NOT_SELECTED_TEXT}>{NOT_SELECTED_TEXT}</Option>
                        { typeOptions }
                    </Select>
				</Form.Item>
				<Form.Item label='Filter by Format' name='formatFilter'>
					<Select defaultValue={NOT_SELECTED_TEXT} style={{ width: 120 }}>
						<Option key={NOT_SELECTED_TEXT}>{NOT_SELECTED_TEXT}</Option>
                        { formatOptions }
                    </Select>
				</Form.Item>
				<Form.Item label='Filter by Status' name='statusFilter'>
					<Select defaultValue={NOT_SELECTED_TEXT} style={{ width: 120 }}>
						<Option key={NOT_SELECTED_TEXT}>{NOT_SELECTED_TEXT}</Option>
                        { statusOptions }
                    </Select>
				</Form.Item>
				<Form.Item>
					<Button onClick={clearSelectForm}>
						Clear Search Options
					</Button>
				</Form.Item>
				<Form.Item>
					<Button type='primary' htmlType='submit'>
						Search
					</Button>
				</Form.Item>
			</Form>
		);
    }

	const updateFormOnFinish = (value) => {
		// if (selectedRows.length > 1 && value.name !== ""){
		// 	alert("You cannot change the names of multiple items to the same name!")
		// 	return;
		// }

		// if (selectedRows.length === 0){
		// 	alert("Must select an item to update!")
		// 	return;
		// }

		// let selectedIDList = selectedRows.map(function(row){
		// 	return row.id;
		// })

		// if (nameUpdate === "" && useDateUpdate === "" && releaseDateUpdate === "" && typeUpdate === -1 && formatUpdate === -1 && statusUpdate === -1){
		// 	alert("Must provide something to update!")
		// 	return;
		// }

		// dispatch(updateMedia(selectedIDList, nameUpdate, useDateUpdate, releaseDateUpdate, typeUpdate, formatUpdate, statusUpdate));
		// dispatch(searchForMedia(idSearch, nameSearch, useDateSearchRange, releaseDateSearchRange, typeFilter, formatFilter, statusFilter, exactNameSearch));
	}

	const renderUpdateForm = () => {
		var typeOptions = mediaTypes.map(function(obj, index){
            return <Option key={ obj.option }>{ obj.option }</Option>;
        });

		var formatOptions = mediaFormats.map(function(obj, index){
            return <Option key={ obj.option }>{ obj.option }</Option>;
        });

		var statusOptions = mediaStatuses.map(function(obj, index){
            return <Option key={ obj.option }>{ obj.option }</Option>;
        });

        return (
			<Form onFinish={updateFormOnFinish}>
				<Form.Item label="Update Name" name='name'>
					<Input  />
				</Form.Item>
				<label>Update Use Date</label>
				<Form.Item>
					<DatePicker/>
				</Form.Item>
				<label>Update Release Date</label>
				<Form.Item>
					<DatePicker/>
				</Form.Item>
				<Form.Item label='Change Type' name='typeFilter'>
                    <Select defaultValue={NOT_SELECTED_TEXT} style={{ width: 120 }}>
						<Option key={NOT_SELECTED_TEXT}>No Change</Option>
                        { typeOptions }
                    </Select>
				</Form.Item>
				<Form.Item label='Change Format' name='formatFilter'>
					<Select defaultValue={NOT_SELECTED_TEXT} style={{ width: 120 }}>
						<Option key={NOT_SELECTED_TEXT}>No Change</Option>
                        { formatOptions }
                    </Select>
				</Form.Item>
				<Form.Item label='Change Status' name='statusFilter'>
					<Select defaultValue={NOT_SELECTED_TEXT} style={{ width: 120 }}>
						<Option key={NOT_SELECTED_TEXT}>No Change</Option>
                        { statusOptions }
                    </Select>
				</Form.Item>
				<Form.Item>
					<Button type='primary' htmlType='submit'>
						Update
					</Button>
				</Form.Item>
			</Form>
		);
	}

	// const rowSelection = {
	// 	selectedRowKeys,
	// 	onChange: (selectedRowKeys, rows) => {
	// 		setSelectedRowKeys(selectedRowKeys);
	// 		setSelectedRows(rows);
	// }};

	const deleteButtonOnClick = () => {
		// if (selectedRows.length === 0){
		// 	alert("Must select an item to delete!")
		// 	return;
		// }

		// if (!window.confirm('Are you sure you wish to delete this item?')) {
		// 	return;
		// }

		// let selectedIDList = selectedRows.map(function(row){
		// 	return row.id;
		// });

		//dispatch(deleteMedia(selectedIDList));
		//dispatch(searchForMedia(idSearch, nameSearch, useDateSearchRange, releaseDateSearchRange, typeFilter, formatFilter, statusFilter, exactNameSearch));
	}

	const renderDeleteButton = () => {
		return (
			<Form.Item>
				<Button onClick={deleteButtonOnClick}>Delete All Selected</Button>
			</Form.Item>
		);
	}

	const deselectRows = () =>{
		setSelectedRowKeys([]);
		setSelectedRows([]);
	}

	const rowSelection = {
		selectedRowKeys,
		onChange: (selectedRowKeys, rows) => {
			setSelectedRowKeys(selectedRowKeys);
			setSelectedRows(rows);
	}};

	const renderSearchTable = () => {
		let dataSource = searchResult.data;
		let columns = [
			{ title: 'ID', dataIndex: 'id' },
			{ title: 'Name', dataIndex: 'name' },
			{ title: 'Release Date', dataIndex: 'release_date' },
			{ title: 'Use Date', dataIndex: 'use_date' },
            { title: 'Type', dataIndex: 'type' },
            { title: 'Format', dataIndex: 'format' },
            { title: 'Status', dataIndex: 'status' },
		];
		return (
		<div>
			<Button onClick={deselectRows}>Deselect All</Button>
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
			{renderDeleteButton()}
			{renderSearchTable()}
		</div>
	);
}

export default SearchPage;