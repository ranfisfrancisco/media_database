import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Table, Select, Checkbox, DatePicker, Menu, Layout } from 'antd';
import { createMedia, searchMedia, updateMedia, deleteMedia, getAllMediaTypes, getAllMediaOwnerships, getAllMediaStatuses } from '../../actions/actions';
import moment from 'moment';

const { Content, Sider } = Layout;
const { Option } = Select;
const { RangePicker } = DatePicker;

const searchSelector = (state) => state.search;
const mediaTypesSelector = (state) => state.mediaTypes.data;
const mediaOwnershipsSelector = (state) => state.mediaOwnerships.data;
const mediaStatusesSelector = (state) => state.mediaStatuses.data;

const ManageMediaPage = () => {

	const dispatch = useDispatch();
	const searchResult = useSelector(searchSelector);
    const mediaTypes = useSelector(mediaTypesSelector);
	const mediaOwnerships = useSelector(mediaOwnershipsSelector);
	const mediaStatuses = useSelector(mediaStatusesSelector);

	//using multiple useForm caused glitches with forms not submitting, updating
	const [form] = Form.useForm();

	const NOT_SELECTED_ID = -1;
	const NOT_SELECTED_TEXT = "All"

	const [visibleContent, setVisibleContent] = useState('search');
	const [selectedRows, setSelectedRows] = useState([]); 
	const [selectedRowKeys, setSelectedRowKeys] = useState([]); // Attatched to table to determine and read what the user has clicked on

	const REFRESH_WAIT_TIME = 2000; // time in milleseconds

	const returnMomentDateRangeStrings = (start, finish) => {
		if (start === undefined || finish === undefined)
			return null
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
			createOwnership: "Not Owned",
			createStatus: "N/A"
		});
	}

	const createFormOnFinish = () => {
		let name = form.getFieldValue("createName")?.trim()
		let useDate = (form.getFieldValue("createUseDate")) ? form.getFieldValue("createUseDate").format('YYYY-MM-DD') : null
		let releaseDate = (form.getFieldValue("createReleaseDate")) ? form.getFieldValue("createReleaseDate").format('YYYY-MM-DD') : null
		let type = valueToColID(form.getFieldValue("createType"), mediaTypes);
		let ownership = valueToColID(form.getFieldValue("createOwnership"), mediaOwnerships);
		let status = valueToColID(form.getFieldValue("createStatus"), mediaStatuses);

		if (name === ""){
			alert("You must enter a name!");
			return;
		}

		if (type === NOT_SELECTED_ID || type === undefined){
			alert("You must set a type!");
			return;
		}

		dispatch(createMedia(name, useDate, releaseDate, type,
		  ownership, status));
	}

	const renderCreateForm = () => {
		var typeOptions = mediaTypes.map(function(obj, index){
            return <Option key={ obj.option }>{ obj.option }</Option>;
        });

		var ownershipOptions = mediaOwnerships.map(function(obj, index){
            return <Option key={ obj.option }>{ obj.option }</Option>;
        });

		var statusOptions = mediaStatuses.map(function(obj, index){
            return <Option key={ obj.option }>{ obj.option }</Option>;
        });

		return (
			<Form form={form} onFinish={createFormOnFinish} id="create-form" >
				<Form.Item label="Name" name='createName' rules={[
					{
						required: true,
						message: 'Please input a name.',
					},
					]}>
					<Input/>
				</Form.Item>

				<Form.Item label="Release Date" name='createReleaseDate'>
					<DatePicker/>
				</Form.Item>

				<Form.Item label="Use Date" name='createUseDate'>
					<DatePicker/>
				</Form.Item>

				<Form.Item label='Type' name='createType' rules={[
					{
						required: true,
						message: 'Please select a type.',
					},
					]}>
                    <Select defaultValue={NOT_SELECTED_TEXT} style={{ width: 120 }}>
						<Option key={NOT_SELECTED_TEXT}>{NOT_SELECTED_TEXT}</Option>
                        { typeOptions }
                    </Select>
				</Form.Item>
				
				<Form.Item label='Ownership' name='createOwnership'>
					<Select defaultValue="Not Owned" style={{ width: 120 }}>
                        { ownershipOptions }
                    </Select>
				</Form.Item>

				<Form.Item label='Status' name='createStatus'>
					<Select defaultValue="N/A" style={{ width: 120 }}>
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
		let name = form.getFieldValue("searchName")?.trim()
		let useDateRange = processDateRange(form.getFieldValue("searchUseDateRange"));
		let releaseDateRange = processDateRange(form.getFieldValue("searchReleaseDateRange"));
		let type =  valueToColID(form.getFieldValue("searchType"), mediaTypes);
		let ownership = valueToColID(form.getFieldValue("searchOwnership"), mediaOwnerships);
		let status = valueToColID(form.getFieldValue("searchStatus"), mediaStatuses);
		let exactNameSearch = form.getFieldValue("exactNameSearch");
		let filterNullReleaseDate = form.getFieldValue("searchReleaseDateFilter");
		let filterNullUseDate = form.getFieldValue("searchUseDateFilter");

		dispatch(searchMedia(id, name, useDateRange, releaseDateRange, type,
		  ownership, status, exactNameSearch, filterNullReleaseDate, filterNullUseDate));
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
			searchUseDateRange: "",
			searchUseDateFilter: "All",
			searchReleaseDateRange: "",
			searchReleaseDateFilter: "All",
			searchType: "All",
			searchOwnership: "All",
			searchStatus: "All"
		});
	}

	const renderSearchForm = () => {
        var typeOptions = mediaTypes.map(function(obj, index){
            return <Option key={ obj.option }>{ obj.option }</Option>;
        });

		var ownershipOptions = mediaOwnerships.map(function(obj, index){
            return <Option key={ obj.option }>{ obj.option }</Option>;
        });

		var statusOptions = mediaStatuses.map(function(obj, index){
            return <Option key={ obj.option }>{ obj.option }</Option>;
        });

        return (
			<Form size="small" form={form} onFinish={searchFormOnFinish} id="search-form" >
				<Form.Item label='ID:'  name='searchID'>
					<Input type="number"  />
				</Form.Item>

				<Form.Item label="Name" name='searchName'>
					<Input  />
				</Form.Item>

				<Form.Item name='exactNameSearch' valuePropName='checked'>
					<Checkbox>Find Exact Name</Checkbox>
				</Form.Item>

				<Form.Item label="Release Date" name='searchReleaseDateRange'>
					<RangePicker/>
				</Form.Item>

				<Form.Item label="Release Date Filter" name='searchReleaseDateFilter'>
					<Select defaultValue={NOT_SELECTED_TEXT} style={{ width: 120 }}>
						<Option key="0">{NOT_SELECTED_TEXT}</Option>
						<Option key="1">No Null Values</Option>
						<Option key="2">Only Null Values</Option>
                    </Select>
				</Form.Item>

				<Form.Item label="Use Date" name='searchUseDateRange'>
					<RangePicker/>
				</Form.Item>

				<Form.Item label="Use Date Filter" name='searchUseDateFilter'>
					<Select defaultValue={NOT_SELECTED_TEXT} style={{ width: 120 }}>
						<Option key="0">{NOT_SELECTED_TEXT}</Option>
						<Option key="1">No Null Values</Option>
						<Option key="2">Only Null Values</Option>
                    </Select>
				</Form.Item>

				<Form.Item label='Type' name='searchType'>
                    <Select defaultValue={NOT_SELECTED_TEXT} style={{ width: 120 }}>
						<Option key={NOT_SELECTED_TEXT}>{NOT_SELECTED_TEXT}</Option>
                        { typeOptions }
                    </Select>
				</Form.Item>
				<Form.Item label='Ownership' name='searchOwnership'>
					<Select defaultValue={NOT_SELECTED_TEXT} style={{ width: 120 }}>
						<Option key={NOT_SELECTED_TEXT}>{NOT_SELECTED_TEXT}</Option>
                        { ownershipOptions }
                    </Select>
				</Form.Item>
				<Form.Item label='Status' name='searchStatus'>
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
		let name = form.getFieldValue("updateName")?.trim()
		let useDate = (form.getFieldValue("updateUseDate")) ? form.getFieldValue("updateUseDate").format('YYYY-MM-DD') : null
		let releaseDate = (form.getFieldValue("updateReleaseDate")) ? form.getFieldValue("updateReleaseDate").format('YYYY-MM-DD') : null
		let type =  valueToColID(form.getFieldValue("updateType"), mediaTypes);
		let ownership = valueToColID(form.getFieldValue("updateOwnership"), mediaOwnerships);
		let status = valueToColID(form.getFieldValue("updateStatus"), mediaStatuses);
	
		if (selectedRows.length > 1 && (name !== "" && name !== undefined)){
			console.log("Rows:", selectedRows, "\nName: ", name);
			alert("You can't change the names of multiple items to the same name!");
			return;
		}

		if (selectedRows.length === 0){
			alert("Must select an item to update!")
			return;
		}

		let selectedIDList = selectedRows.map(function(row){
			return row.media_id;
		})

		if (name === "" && useDate === "" && releaseDate === "" && type === -1 && ownership === -1 && status === -1){
			alert("Must provide something to update!")
			return;
		}

		dispatch(updateMedia(selectedIDList, name, useDate, releaseDate, type, ownership, status));
		clearUpdateForm();
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
			updateOwnership: "All",
			updateStatus: "All"
		});
	}


	const renderUpdateForm = () => {
		var typeOptions = mediaTypes.map(function(obj, index){
            return <Option key={ obj.option }>{ obj.option }</Option>;
        });

		var ownershipOptions = mediaOwnerships.map(function(obj, index){
            return <Option key={ obj.option }>{ obj.option }</Option>;
        });

		var statusOptions = mediaStatuses.map(function(obj, index){
            return <Option key={ obj.option }>{ obj.option }</Option>;
        });

        return (
			<Form  key={1} form={form} onFinish={updateFormOnFinish} id="update-form" >
				<Form.Item label="Name" name="updateName">
					<Input  />
				</Form.Item>

				<Form.Item label="Release Date" name="updateReleaseDate">
					<DatePicker/>
				</Form.Item>

				<Form.Item label="Use Date" name="updateUseDate">
					<DatePicker/>
				</Form.Item>

				<Form.Item label='Type' name='updateType'>
                    <Select defaultValue={NOT_SELECTED_TEXT} style={{ width: 120 }}>
						<Option key={NOT_SELECTED_TEXT}>No Change</Option>
                        { typeOptions }
                    </Select>
				</Form.Item>

				<Form.Item label='Ownership' name='updateOwnership'>
					<Select defaultValue={NOT_SELECTED_TEXT} style={{ width: 120 }}>
						<Option key={NOT_SELECTED_TEXT}>No Change</Option>
                        { ownershipOptions }
                    </Select>
				</Form.Item>

				<Form.Item label='Status' name='updateStatus'>
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
			return row.media_id;
		})

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

	const getFullDate = (date) => {
		if (!date)
			return "";
	
		return moment(new Date(date)).utc(false).format("YYYY/MM/DD")
	}

	const renderSearchTable = () => {
		let dataSource = searchResult.data;
		let itemCount = dataSource.length;

		let columns = [
			{ title: 'ID', dataIndex: 'media_id', sorter: {compare: (a,b) => a.media_id - b.media_id} },
			{ title: 'Name', dataIndex: 'name', sorter: {compare: (a,b) => a.name > b.name} },
			{ title: 'Release Date', dataIndex: 'release_date', render: ((date) => getFullDate(date)),
				 sorter: {compare: (a,b) => new Date(a.release_date) - new Date(b.release_date)} },
			{ title: 'Use Date', dataIndex: 'use_date', render: ((date) => getFullDate(date)),
				 sorter: {compare: (a,b) => new Date(a.use_date) - new Date(b.use_date)} },
            { title: 'Type', dataIndex: 'type', sorter: {compare: (a,b) => a.type > b.type} },
            { title: 'Ownership', dataIndex: 'ownership', sorter: {compare: (a,b) => a.ownership > b.ownership} },
            { title: 'Status', dataIndex: 'status', sorter: {compare: (a,b) => a.status > b.status} },
			{ title: 'Date Entered Into DB', dataIndex: 'created_date', render: ((date) => getFullDate(date)),
				 sorter: {compare: (a,b) => new Date(a.created_date) - new Date(b.created_date)} },
		];

		return (
		<div>
			<Button onClick={deselectRows}>Deselect {selectedRows.length}</Button>
			<Table dataSource={dataSource} columns={columns} rowSelection={rowSelection} rowKey={record =>record.media_id} title={() => `${itemCount} items found`} />
		</div>
		);
	}

    //load media types, statuses, ownerships once on page load
    useEffect(() => {
        dispatch(getAllMediaTypes());
		dispatch(getAllMediaOwnerships());
		dispatch(getAllMediaStatuses());
    }, []);

	const handleMenuClick = (e) => setVisibleContent(e.key);

	const renderMenu = () => (
		<Menu theme="dark" mode='horizontal' onClick={handleMenuClick} selectedKeys={[visibleContent]}>
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

	const renderSelectedForm = () => {
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
		<div>
		<Layout>
			<Sider 
			theme="light"
			width={390}
			style={{
				overflow: 'auto',
				height: '100vh',
				position: 'fixed',
				left: 0,
			}}
    		>
				<div className="entry-form">
					{renderMenu()}
					<br></br>
					{renderSelectedForm()}
				</div>
			</Sider>
			<Content style={{ marginLeft: 390 }}>
					{renderSearchTable()}
			</Content>
		</Layout>
		</div>
	);
}
export default ManageMediaPage;