import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table } from 'antd';

import { getReserveDocs } from '../../actions/reader';

const pidSelector = (state) => state.page.reader.pid;
const reservedSelector = (state) => state.reserved;

const ReservedDocsPage = () => {

	const dispatch = useDispatch();
	const pid = useSelector(pidSelector);
	const reserved = useSelector(reservedSelector);

	useEffect(() => {
		dispatch(getReserveDocs(pid));
	}, []);

	const renderTable = () => {
		let dataSource = reserved.data;
		let columns = [
			{ title: 'Title', dataIndex: 'TITLE' },
			{ title: 'Doc ID', dataIndex: 'DOCID' },
			{ title: 'Copy #', dataIndex: 'COPYNO' },
			{ title: 'Branch ID', dataIndex: 'BID' },
			{ title: 'Date Reserved', dataIndex: 'DTIME' },
		];
		return <Table dataSource={dataSource} columns={columns} />;
	}

	return (
		<div className='reader-content-wrapper'>
			{renderTable()}
		</div>
	);
}

export default ReservedDocsPage;
