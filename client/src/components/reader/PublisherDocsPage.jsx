import { useDispatch, useSelector } from 'react-redux';
import { Form, Input, Button, List } from 'antd';

import { getPublisherDocs } from '../../actions/reader';

const publisherDocsSelector = (state) => state.publisherDocs;

const PublisherDocsPage = () => {

	const dispatch = useDispatch();
	const publisherDocs = useSelector(publisherDocsSelector);

	const publisherOnFinished = (value) => {
		dispatch(getPublisherDocs(value.publisher));
	}

	const renderPublishedDocsList = () => (
		<List
			itemLayout='horizontal'
			dataSource={publisherDocs.data}
			renderItem={item => (
				<List.Item>
					{item.DOCID}
					{item.TITLE}
				</List.Item>
			)}
		/>
	);

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
			{renderPublishedDocsList()}
		</div>
	);
}

export default PublisherDocsPage;
