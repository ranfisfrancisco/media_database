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
	const [exactNameSearch, setExactNameSearch] = useState(false);

	const [nameSearch, setNameSearch] = useState("");
	const [idSearch, setIdSearch] = useState("");
	const [useDateSearchRange, setUsedDateSearchRange] = useState(["",""]);
	const [releaseDateSearchRange, setReleaseDateSearchRange] = useState(["",""]);
	const [typeFilter, setTypeFilter] = useState(NOT_SELECTED_TEXT);
	const [formatFilter, setFormatFilter] = useState(NOT_SELECTED_TEXT);
	const [statusFilter, setStatusFilter] = useState(NOT_SELECTED_TEXT);

	const [nameUpdate, setNameUpdate] = useState("");
	const [useDateUpdate, setUseDateUpdate] = useState("");
	const [releaseDateUpdate, setReleaseDateUpdate] = useState("");
	const [typeUpdate, setTypeUpdate] = useState(NOT_SELECTED_TEXT);
	const [formatUpdate, setFormatUpdate] = useState(NOT_SELECTED_TEXT);
	const [statusUpdate, setStatusUpdate] = useState(NOT_SELECTED_TEXT);

	const [selectedRows, setSelectedRows] = useState([]); 
	const [selectedRowKeys, setSelectedRowKeys] = useState([]); // Attatched to table to determine and read what the user has clicked on

	const returnMomentDateRangeStrings = (start, finish) => {
		return [start.format('YYYY-MM-DD'), finish.format('YYYY-MM-DD')];
	};

	const processDateRange = (dateRange) => {
		if (dateRange[0] === "" || dateRange[1] === ""){
			return "";
		} 
		return returnMomentDateRangeStrings(dateRange[0], dateRange[1]);
	}

	const valueToColID = (value, options) => {
		if (value === NOT_SELECTED_TEXT){
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

	const searchFormOnFinish = (value) => {
		dispatch(searchForMedia(idSearch, nameSearch, processDateRange(useDateSearchRange), processDateRange(releaseDateSearchRange),
		valueToColID(typeFilter, mediaTypes), valueToColID(formatFilter, mediaFormats), valueToColID(statusFilter, mediaStatuses), exactNameSearch));
		deselectRows();
	}

	const clearSelectForm = () => {
		setNameSearch("");
		setIdSearch("");
		setUsedDateSearchRange(["",""]);
		setReleaseDateSearchRange(["",""]);
		// setExactNameSearch(false);
		// setTypeFilter(null);
		// setFormatFilter(null);
		// setStatusFilter(null);

		console.log(typeFilter, formatFilter, statusFilter)
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
			<Form onFinish={searchFormOnFinish}>
				<Form.Item label='Search by ID:'  >
					<Input type="number" name='id' value={idSearch} onInput={(e)=>{setIdSearch(e.target.value)}} />
				</Form.Item>

				<Form.Item label="Search by Name">
					<Input name='nameSearch' value={nameSearch} onInput={(e)=>{setNameSearch(e.target.value)}} />
				</Form.Item>

				<Form.Item>
					<Checkbox  onChange={(e) => {setExactNameSearch(e.target.checked)}}>Find Exact Name</Checkbox>
				</Form.Item>

				<label>Use Date</label>
				<Form.Item>
					<RangePicker value={useDateSearchRange !== "" ? useDateSearchRange : ""} onChange={(dateRange) => {setUsedDateSearchRange(dateRange)}}/>
				</Form.Item>

				<label>Release Date</label>
				<Form.Item>
					<RangePicker value={releaseDateSearchRange !== "" ? releaseDateSearchRange : ""} onChange={(dateRange) => {setReleaseDateSearchRange(dateRange)}}/>
				</Form.Item>

				<Form.Item label='Filter by Type' name='typeFilter'>
                    <Select defaultValue={typeFilter} value={typeFilter} style={{ width: 120 }} onChange={(value) => {setTypeFilter(value)}}>
						<Option key={NOT_SELECTED_TEXT}>{NOT_SELECTED_TEXT}</Option>
                        { typeOptions }
                    </Select>
				</Form.Item>
				<Form.Item label='Filter by Format' name='formatFilter'>
                    <Select defaultValue={NOT_SELECTED_TEXT} value={formatFilter} style={{ width: 120 }} onChange={(value) => {setFormatFilter(value)}}>
						<Option key={NOT_SELECTED_TEXT}>{NOT_SELECTED_TEXT}</Option>
                        { formatOptions }
                    </Select>
				</Form.Item>
				<Form.Item label='Filter by Status' name='statusFilter'>
                    <Select defaultValue={NOT_SELECTED_TEXT} value={statusFilter}  style={{ width: 120 }} onChange={(value) => {setStatusFilter(value)}}>
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

	const renderFormSubmitButton = (buttonText) => {
		return (
				<Form.Item>
					<Button type='primary' htmlType='submit'>
						{buttonText}
					</Button>
				</Form.Item>
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

		if (nameUpdate === "" && useDateUpdate === "" && releaseDateUpdate === "" && typeUpdate === -1 && formatUpdate === -1 && statusUpdate === -1){
			alert("Must provide something to update!")
			return;
		}

		dispatch(updateMedia(selectedIDList, nameUpdate, useDateUpdate, releaseDateUpdate, typeUpdate, formatUpdate, statusUpdate));
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
            return <Option key={ obj.option }>{ obj.option }</Option>;
        });

		var formatOptions = mediaFormats.map(function(obj, index){
            return <Option key={ obj.option }>{ obj.option }</Option>;
        });

		var statusOptions = mediaStatuses.map(function(obj, index){
            return <Option key={ obj.option }>{ obj.option }</Option>;
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

	const deleteButtonOnClick = () => {
		if (selectedRows.length === 0){
			alert("Must select an item to delete!")
			return;
		}

		if (!window.confirm('Are you sure you wish to delete this item?')) {
			return;
		}

		let selectedIDList = selectedRows.map(function(row){
			return row.id;
		});

		dispatch(deleteMedia(selectedIDList));
		dispatch(searchForMedia(idSearch, nameSearch, useDateSearchRange, releaseDateSearchRange, typeFilter, formatFilter, statusFilter, exactNameSearch));
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