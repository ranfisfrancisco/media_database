import { useState } from 'react';
import { Menu } from 'antd';
import { 
	SearchOutlined,
	RollbackOutlined,
	FormOutlined,
	BookOutlined,
	DollarOutlined,
	ProfileOutlined,
	FileOutlined,
} from '@ant-design/icons';

import SearchPage from './SearchPage';
import CheckoutPage from './CheckoutPage';
import ReturnPage from './ReturnPage';
import ReservePage from './ReservePage';
import ComputeFinePage from './ComputeFinePage';
import ReservedDocsPage from './ReservedDocsPage';
import PublisherDocsPage from './PublisherDocsPage';

const ReaderPage = () => {

	const [visibleContent, setVisibleContent] = useState('search');

	const renderContent = () => {
		if(visibleContent === 'search') {
			return <SearchPage />;
		} else if(visibleContent === 'checkout') {
			return <CheckoutPage />;
		} else if(visibleContent === 'return') {
			return <ReturnPage />;
		} else if(visibleContent === 'reserve') {
			return <ReservePage />;
		} else if(visibleContent === 'computeFine') {
			return <ComputeFinePage />;
		} else if(visibleContent === 'reservedDocs') {
			return <ReservedDocsPage />;
		} else if(visibleContent === 'getPublisherDocs') {
			return <PublisherDocsPage />;
		} else {
			return <div>ERROR</div>;
		}
	}

	const handleClick = (e) => setVisibleContent(e.key);

	const renderMenu = () => (
		<Menu mode='horizontal' onClick={handleClick} selectedKeys={[visibleContent]}>
			<Menu.Item key='search' icon={<SearchOutlined />}>
				Search
			</Menu.Item>
			<Menu.Item key='checkout' icon={<FormOutlined />}>
				Checkout
			</Menu.Item>
			<Menu.Item key='return' icon={<RollbackOutlined />}>
				Return
			</Menu.Item>
			<Menu.Item key='reserve' icon={<BookOutlined />}>
				Reserve	
			</Menu.Item>
			<Menu.Item key='computeFine' icon={<DollarOutlined />}>
				Compute Fine	
			</Menu.Item>
			<Menu.Item key='reservedDocs' icon={<ProfileOutlined />}>
				Get Reserved Items
			</Menu.Item>
			<Menu.Item key='getPublisherDocs' icon={<FileOutlined />}>
				Get Publisher Documents
			</Menu.Item>
		</Menu>
	);
	

	return (
		<div className='reader-page-wrapper'>
			{renderMenu()}
			{renderContent()}
		</div>
	);
}

export default ReaderPage;
