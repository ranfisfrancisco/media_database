import { useDispatch, useSelector } from 'react-redux';
import { Form, Input, Button, Table } from 'antd';

import { getPublisherDocs } from '../../actions/reader';

const publisherDocsSelector = (state) => state.publisherDocs;

const PublisherDocsPage = () => {

	const dispatch = useDispatch();
	const publisherDocs = useSelector(publisherDocsSelector);

	const publisherOnFinished = (value) => {
		dispatch(getPublisherDocs(value.publisher));
	}

	const renderPublishedDocsTable = () => {
		let dataSource = publisherDocs.data;
		let columns = [
			{ title: 'Doc ID', dataIndex: 'DOCID' },
			{ title: 'Title', dataIndex: 'TITLE' },
		];
		return <Table dataSource={dataSource} columns={columns} />;
	}

	const renderPublishedSearch = () => {
		return (
			<Form onFinish={publisherOnFinished}>
				<Form.Item label='Search by Publisher:' name='publisher'>
					<Input />
				</Form.Item>
				<Form.Item>
					<Button type='primary' htmlType='submit'>
						Submit
					</Button>
				</Form.Item>
			</Form>
		);
	}

	return (
		<div className='reader-content-wrapper'>
			{renderPublishedSearch()}
			{renderPublishedDocsTable()}
		</div>
	);
}

export default PublisherDocsPage;
