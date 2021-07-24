import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Table, Select, Checkbox, DatePicker } from 'antd';
import { searchForMedia, updateMedia, getAllMediaTypes, getAllMediaFormats, getAllMediaStatuses } from '../../actions/actions';

const { Option } = Select;
const { RangePicker } = DatePicker;

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

	const [nameSearch, setNameSearch] = useState([]);
	const [idSearch, setIdSearch] = useState([]);
	const [useDateSearchRange, setUsedDateSearchRange] = useState([]);
	const [releaseDateSearchRange, setReleaseDateSearchRange] = useState([]);
	const [typeFilter, setTypeFilter] = useState(NOT_SELECTED_ID);
	const [formatFilter, setFormatFilter] = useState(NOT_SELECTED_ID);
	const [statusFilter, setStatusFilter] = useState(NOT_SELECTED_ID);

	const [nameUpdate, setNameUpdate] = useState([]);
	const [useDateUpdate, setUseDateUpdate] = useState([]);
	const [releaseDateUpdate, setReleaseDateUpdate] = useState([]);
	const [typeUpdate, setTypeUpdate] = useState(NOT_SELECTED_ID);
	const [formatUpdate, setFormatUpdate] = useState(NOT_SELECTED_ID);
	const [statusUpdate, setStatusUpdate] = useState(NOT_SELECTED_ID);

	const [selectedRows, setSelectedRows] = useState([]); 
	const [selectedRowKeys, setSelectedRowKeys] = useState([]); // Attatched to table to determine and read what the user has clicked on

	const searchFormOnFinish = (value) => {
		deselectButtonOnClick();

		if (useDateSearchRange[0] === "")
			setUsedDateSearchRange([]);
		if (releaseDateSearchRange[0] === "")
			setReleaseDateSearchRange([]);

		dispatch(searchForMedia(idSearch, nameSearch, useDateSearchRange, releaseDateSearchRange, typeFilter, formatFilter, statusFilter, exactNameSearch));
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
				<Form.Item label='Search by ID:' name='id' onInput={(e)=>{setIdSearch(e.target.value)}}>
					<Input  type="number"  />
				</Form.Item>

				<Form.Item label="Search by Name" name='name' onInput={(e)=>{setNameSearch(e.target.value)}}>
					<Input  />
				</Form.Item>

				<Form.Item>
					<Checkbox onChange={(e) => {setExactNameSearch(e.target.checked)}}>Find Exact Name</Checkbox>
				</Form.Item>

				<label>Use Date</label>
				<Form.Item>
					<RangePicker onChange={(date, dateString) => {setUsedDateSearchRange([dateString[0], dateString[1]])}}/>
				</Form.Item>

				<label>Release Date</label>
				<Form.Item>
					<RangePicker onChange={(date, dateString) => {setReleaseDateSearchRange([dateString[0], dateString[1]])}}/>
				</Form.Item>

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

	const renderFormSubmitButton = (buttonText) => {
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
					{renderSearchOptions()}
					{renderFormSubmitButton("Search")}
			</Form>
		);
	}

	const updateFormOnFinish = (value) => {
		if (selectedRows.length > 1 && value.name !== ""){
			alert("You cannot change the names of multiple items to the same name!")
			return;
		}

		if (selectedRows.length === 0){
			alert("Must select an item to update!")
			return;
		}

		let selectedIDList = selectedRows.map(function(row){
			return row.id;
		})

		dispatch(updateMedia(selectedIDList, value.name, useDateUpdate, releaseDateUpdate, typeUpdate, formatUpdate, statusUpdate));
		dispatch(searchForMedia(idSearch, nameSearch, useDateSearchRange, releaseDateSearchRange, typeFilter, formatFilter, statusFilter, exactNameSearch));
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
				<Form.Item label="Update Name" name='name' onInput={(e)=>{setNameUpdate(e.target.value)}}>
					<Input  />
				</Form.Item>
				<label>Update Use Date</label>
				<Form.Item>
					<DatePicker onChange={(date, dateString) => {setUseDateUpdate(dateString)}}/>
				</Form.Item>
				<label>Update Release Date</label>
				<Form.Item>
					<DatePicker onChange={(date, dateString) => {setReleaseDateUpdate(dateString)}}/>
				</Form.Item>
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
					{renderUpdateOptions()}
					{renderFormSubmitButton("Update Selected Items")}
			</Form>
		);
	}

	const rowSelection = {
		selectedRowKeys,
		onChange: (selectedRowKeys, rows) => {
			setSelectedRowKeys(selectedRowKeys);
			setSelectedRows(rows);
	}};

	const deselectButtonOnClick = () =>{
		setSelectedRowKeys([]);
		setSelectedRows([]);
	}

	const renderSearchTable = () => {
		let dataSource = search.data;
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
			<Button onClick={deselectButtonOnClick}>Deselect All</Button>
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