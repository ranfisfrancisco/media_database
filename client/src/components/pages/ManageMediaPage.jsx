import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Table, Select, Checkbox, DatePicker, Menu } from 'antd';
import { createMedia, searchMedia, updateMedia, deleteMedia, getAllMediaTypes, getAllMediaFormats, getAllMediaStatuses } from '../../actions/actions';

const { Option } = Select;
const { RangePicker } = DatePicker;

const searchSelector = (state) => state.search;
const mediaTypesSelector = (state) => state.mediaTypes.data;
const mediaFormatsSelector = (state) => state.mediaFormats.data;
const mediaStatusesSelector = (state) => state.mediaStatuses.data;

const ManageMediaPage = () => {
	const [visibleContent, setVisibleContent] = useState('search');

	//using multiple useForm caused glitches with forms not submitting, updating
	const [form] = Form.useForm();

	const dispatch = useDispatch();
	const searchResult = useSelector(searchSelector);
    const mediaTypes = useSelector(mediaTypesSelector);
	const mediaFormats = useSelector(mediaFormatsSelector);
	const mediaStatuses = useSelector(mediaStatusesSelector);

	const NOT_SELECTED_ID = -1;
	const NOT_SELECTED_TEXT = "All"

	const [selectedRows, setSelectedRows] = useState([]); 
	const [selectedRowKeys, setSelectedRowKeys] = useState([]); // Attatched to table to determine and read what the user has clicked on

	const REFRESH_WAIT_TIME = 1000/2;

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

	const clearCreateForm = () => {
		form.setFieldsValue({
			createName: "",
			createUseDate: "",
			createReleaseDate: "",
			createType: "All",
			createFormat: "All",
			createStatus: "All"
		});
	}

	const createFormOnFinish = () => {
		let name = form.getFieldValue("createName")
		let useDateRange = form.getFieldValue("createUseDate");
		let releaseDateRange = form.getFieldValue("createReleaseDate");
		let typeFilter =  valueToColID(form.getFieldValue("createType"), mediaTypes);
		let formatFilter = valueToColID(form.getFieldValue("createFormat"), mediaFormats);
		let statusFilter = valueToColID(form.getFieldValue("createStatus"), mediaStatuses);

		dispatch(createMedia(name, useDateRange, releaseDateRange, typeFilter,
		  formatFilter, statusFilter));
	}

	const renderCreateForm = () => {
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
			<Form form={form} onFinish={createFormOnFinish} id="create-form" >
				<Form.Item label="Name" name='createName'>
					<Input/>
				</Form.Item>

				<Form.Item label="Use Date" name='createUseDate'>
					<DatePicker/>
				</Form.Item>

				<Form.Item label="Release Date" name='createReleaseDate'>
					<DatePicker/>
				</Form.Item>

				<Form.Item label='Type' name='createType'>
                    <Select defaultValue={NOT_SELECTED_TEXT} style={{ width: 120 }}>
						<Option key={NOT_SELECTED_TEXT}>{NOT_SELECTED_TEXT}</Option>
                        { typeOptions }
                    </Select>
				</Form.Item>
				
				<Form.Item label='Format' name='createFormat'>
					<Select defaultValue={NOT_SELECTED_TEXT} style={{ width: 120 }}>
						<Option key={NOT_SELECTED_TEXT}>{NOT_SELECTED_TEXT}</Option>
                        { formatOptions }
                    </Select>
				</Form.Item>

				<Form.Item label='Status' name='createStatus'>
					<Select defaultValue={NOT_SELECTED_TEXT} style={{ width: 120 }}>
						<Option key={NOT_SELECTED_TEXT}>{NOT_SELECTED_TEXT}</Option>
                        { statusOptions }
                    </Select>
				</Form.Item>

				<Form.Item>
					<Button onClick={() => {clearCreateForm()}}>
						Clear Form
					</Button>
				</Form.Item>

				<Form.Item>
					<Button type='primary' htmlType='submit'>
						Add
					</Button>
				</Form.Item>
			</Form>
		);
	}

	const submitSearch = () => {
		let id = form.getFieldValue("searchID")
		let name = form.getFieldValue("searchName")
		let useDateRange = processDateRange(form.getFieldValue("searchUseDateRange"));
		let releaseDateRange = processDateRange(form.getFieldValue("searchReleaseDateRange"));
		let typeFilter =  valueToColID(form.getFieldValue("searchType"), mediaTypes);
		let formatFilter = valueToColID(form.getFieldValue("searchFormat"), mediaFormats);
		let statusFilter = valueToColID(form.getFieldValue("searchStatus"), mediaStatuses);
		let exactNameSearch = form.getFieldValue("exactNameSearch");

		dispatch(searchMedia(id, name, useDateRange, releaseDateRange, typeFilter,
		  formatFilter, statusFilter, exactNameSearch));
	}

	const searchFormOnFinish = () => {
		submitSearch();
		deselectRows();
	}

	const clearSearchForm = () => {
		form.setFieldsValue({
			searchID: "",
			searchName: "",
			exactNameSearch: false,
			searchUseDate: "",
			searchReleaseDate: "",
			searchType: "All",
			searchFormat: "All",
			searchStatus: "All"
		});
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
			<Form form={form} onFinish={searchFormOnFinish} id="search-form" >
				<Form.Item label='Search by ID:'  name='searchID'>
					<Input type="number"  />
				</Form.Item>

				<Form.Item label="Search by Name" name='searchName'>
					<Input  />
				</Form.Item>

				<Form.Item name='exactNameSearch' valuePropName='checked'>
					<Checkbox>Find Exact Name</Checkbox>
				</Form.Item>

				<Form.Item label="Use Date" name='searchUseDateRange'>
					<RangePicker/>
				</Form.Item>

				<Form.Item label="Release Date" name='searchReleaseDateRange'>
					<RangePicker/>
				</Form.Item>

				<Form.Item label='Filter by Type' name='searchType'>
                    <Select defaultValue={NOT_SELECTED_TEXT} style={{ width: 120 }}>
						<Option key={NOT_SELECTED_TEXT}>{NOT_SELECTED_TEXT}</Option>
                        { typeOptions }
                    </Select>
				</Form.Item>
				<Form.Item label='Filter by Format' name='searchFormat'>
					<Select defaultValue={NOT_SELECTED_TEXT} style={{ width: 120 }}>
						<Option key={NOT_SELECTED_TEXT}>{NOT_SELECTED_TEXT}</Option>
                        { formatOptions }
                    </Select>
				</Form.Item>
				<Form.Item label='Filter by Status' name='searchStatus'>
					<Select defaultValue={NOT_SELECTED_TEXT} style={{ width: 120 }}>
						<Option key={NOT_SELECTED_TEXT}>{NOT_SELECTED_TEXT}</Option>
                        { statusOptions }
                    </Select>
				</Form.Item>

				<Form.Item>
					<Button onClick={() => {clearSearchForm()}}>
						Clear Form
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

	const updateFormOnFinish = () => {
		let name = form.getFieldValue("updateName")
		let useDate = (form.getFieldValue("updateUseDate")) ? form.getFieldValue("updateUseDate").format('YYYY-MM-DD') : null
		let releaseDate = (form.getFieldValue("updateReleaseDate")) ? form.getFieldValue("updateReleaseDate").format('YYYY-MM-DD') : null
		let typeFilter =  valueToColID(form.getFieldValue("updateType"), mediaTypes);
		let formatFilter = valueToColID(form.getFieldValue("updateFormat"), mediaFormats);
		let statusFilter = valueToColID(form.getFieldValue("updateStatus"), mediaStatuses);
	
		if (selectedRows.length > 1 && name !== ""){
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

		if (name === "" && useDate === "" && releaseDate === "" && typeFilter === -1 && formatFilter === -1 && statusFilter === -1){
			alert("Must provide something to update!")
			return;
		}

		dispatch(updateMedia(selectedIDList, name, useDate, releaseDate, typeFilter, formatFilter, statusFilter));
		setTimeout(function () {
			submitSearch();
		}, REFRESH_WAIT_TIME);
	}

	const clearUpdateForm = () => {
		form.setFieldsValue({
			updateName: "",
			updateUseDate: "",
			updateReleaseDate: "",
			updateType: "All",
			updateFormat: "All",
			updateStatus: "All"
		});
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
			<Form  key={1} form={form} onFinish={updateFormOnFinish} id="update-form" >
				<Form.Item label="Update Name" name="updateName">
					<Input  />
				</Form.Item>

				<Form.Item label="Update Use Date" name="updateUseDate">
					<DatePicker/>
				</Form.Item>

				<Form.Item label="Update Release Date" name="updateReleaseDate">
					<DatePicker/>
				</Form.Item>

				<Form.Item label='Change Type' name='updateType'>
                    <Select defaultValue={NOT_SELECTED_TEXT} style={{ width: 120 }}>
						<Option key={NOT_SELECTED_TEXT}>No Change</Option>
                        { typeOptions }
                    </Select>
				</Form.Item>

				<Form.Item label='Change Format' name='updateFormat'>
					<Select defaultValue={NOT_SELECTED_TEXT} style={{ width: 120 }}>
						<Option key={NOT_SELECTED_TEXT}>No Change</Option>
                        { formatOptions }
                    </Select>
				</Form.Item>

				<Form.Item label='Change Status' name='updateStatus'>
					<Select defaultValue={NOT_SELECTED_TEXT} style={{ width: 120 }}>
						<Option key={NOT_SELECTED_TEXT}>No Change</Option>
                        { statusOptions }
                    </Select>
				</Form.Item>

				<Form.Item>
					<Button onClick={() => {clearUpdateForm()}}>
						Clear Form
					</Button>
				</Form.Item>

				<Form.Item>
					<Button type='primary' htmlType='submit'>
						Update
					</Button>
				</Form.Item>
			</Form>
		);
	}

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
		setTimeout(function () {
			submitSearch();
		}, REFRESH_WAIT_TIME);
		
	}

	const renderDeleteButton = () => {
		return (
			<Form.Item>
				<Button onClick={deleteButtonOnClick} style={{ background:  "#f0222c", borderColor: "yellow" }}>
					Delete All Selected Items
				</Button>
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
			{ title: 'ID', dataIndex: 'id', sorter: {compare: (a,b) => a.id - b.id} },
			{ title: 'Name', dataIndex: 'name', sorter: {compare: (a,b) => a.name > b.name} },
			{ title: 'Release Date', dataIndex: 'release_date', sorter: {compare: (a,b) => new Date(a.release_date) - new Date(b.release_date)} },
			{ title: 'Use Date', dataIndex: 'use_date', sorter: {compare: (a,b) => new Date(a.use_date) - new Date(b.use_date)} },
            { title: 'Type', dataIndex: 'type', sorter: {compare: (a,b) => a.type > b.type} },
            { title: 'Format', dataIndex: 'format', sorter: {compare: (a,b) => a.format > b.format} },
            { title: 'Status', dataIndex: 'status', sorter: {compare: (a,b) => a.status > b.status} },
			{ title: 'Date Entered Into DB', dataIndex: 'created_date', sorter: {compare: (a,b) => new Date(a.created_date) - new Date(b.created_date)} },
		];
		return (
		<div>
			<Button onClick={deselectRows}>Deselect All</Button>
			<Table dataSource={dataSource} columns={columns} rowSelection={rowSelection} rowKey={record =>record.id} />
		</div>
		);
	}

    //load media types, statuses, formats once on page load
    useEffect(() => {
        dispatch(getAllMediaTypes());
		dispatch(getAllMediaFormats());
		dispatch(getAllMediaStatuses());
    }, []);

	const handleMenuClick = (e) => setVisibleContent(e.key);

	const renderMenu = () => (
		<Menu mode='horizontal' onClick={handleMenuClick} selectedKeys={[visibleContent]} theme='dark'>
			<Menu.Item key='create'>
				Create
			</Menu.Item>
			<Menu.Item key='search'>
				Search
			</Menu.Item>
			<Menu.Item key='update'>
				Update
			</Menu.Item>
			<Menu.Item key='delete'>
				Delete
			</Menu.Item>
		</Menu>
	);

	const renderContent = () => {
		if (visibleContent === 'create'){
			return renderCreateForm();
		}else if(visibleContent === 'search') {
			return renderSearchForm();
		} else if (visibleContent === 'update') {
			return renderUpdateForm();
		} else if (visibleContent === 'delete') {
			return renderDeleteButton();
		}

		return <div>Select an Option</div>;
	}

	return (
		<div className='search-content-wrapper'>
			<div className='entry-form'>
				{renderMenu()}
				{renderContent()}
			</div>
			<div className='result-table'>
				{renderSearchTable()}
			</div>
		</div>
	);
}

export default ManageMediaPage;