import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, DatePicker, Table } from 'antd';

import { averageBorrowingFine } from '../../actions/admin';

const { RangePicker } = DatePicker;

const averageFineSelector = (state) => state.averageFine;

const AverageFinePage = () => {

	const [dateRange, setDateRange] = useState([]);
	const dispatch = useDispatch();
	const averageFine = useSelector(averageFineSelector);

	const onChange = (date, dateString) => {
		setDateRange([dateString[0], dateString[1]]);
	}

	const renderTable = () => {
		let dataSource = averageFine.data;
		let columns = [
			{ title: 'Branch ID', dataIndex: 'BID' },
			{ title: 'Branch Name', dataIndex: 'LNAME' },
			{ title: 'Average Fines', dataIndex: 'AVG_FINES' },
		];
		return <Table dataSource={dataSource} columns={columns} />;
	}

	const onClick = () => {
		dispatch(averageBorrowingFine(dateRange[0], dateRange[1]));
	}

	return (
		<div className='admin-content-wrapper'>
			<div>
				<RangePicker onChange={onChange} />
			</div>
			<Button type='primary' onClick={onClick}>
				Submit
			</Button>
			{renderTable()}
		</div>
	);
}

export default AverageFinePage;
