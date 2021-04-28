import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { List } from 'antd';

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

	const renderReservedDocs = () => (
		<List
			itemLayout='horizontal'
			dataSource={reserved.data}
			renderItem={item => (
				<List.Item>
					{item.DTIME}
					{item.DOCID}
				</List.Item>
			)}
		/>
	);

	return (
		<div className='reserved-docs-page-wrapper'>
			{renderReservedDocs()}
		</div>
	);
}

export default ReservedDocsPage;
