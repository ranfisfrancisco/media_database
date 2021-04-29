import { useDispatch, useSelector } from 'react-redux';
import { Form, Input, Button, List } from 'antd';

import { searchId, searchTitle, searchPublisher } from '../../actions/reader';

const searchSelector = (state) => state.search;

const SearchPage = () => {

	const dispatch = useDispatch();
	const search = useSelector(searchSelector);

	const idOnFinished = (value) => {
		dispatch(searchId(value.id));
	}

	const titleOnFinished = (value) => {
		dispatch(searchTitle(value.title));
	}

	const publisherOnFinished = (value) => {
		dispatch(searchPublisher(value.publisher));
	}

	const renderHeader = () => (
		<div className='header-wrapper'>
			<>DOCID</>
			<>TITLE</>
			<>PDATE</>
			<>PUBLISHERID</>
		</div>
	);

	const renderSearchList = () => (
		<List 
			itemLayout='horizontal'
			dataSource={search.data}
			renderItem={item => (
				<List.Item>
					{item.DOCID}
					{item.TITLE}
					{item.PDATE}
					{item.PUBLISHERID}
				</List.Item>
			)}
			header={renderHeader()}
		/>
	)

	const renderIdSearch = () => {
		return (
			<Form onFinish={idOnFinished}>
				<Form.Item label='Search by ID:' name='id'>
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

	const renderTitleSearch = () => {
		return (
			<Form onFinish={titleOnFinished}>
				<Form.Item label='Search by Title:' name='title'>
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

	const renderPublisherSearch = () => {
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
			{renderIdSearch()}
			{renderTitleSearch()}
			{renderPublisherSearch()}
			{renderSearchList()}
		</div>
	);
}

export default SearchPage;
