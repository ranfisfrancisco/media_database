import { useState } from 'react';
import { useSelector } from 'react-redux';
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

import LogoutButton from '../LogoutButton';

import SearchPage from './SearchPage';

//const readerUsernameSelector = (state) => state.page.reader.pname;

const SelectPage = () => {

	const [visibleContent, setVisibleContent] = useState('search');
	//const readerUsername = useSelector(readerUsernameSelector);

	const handleClick = (e) => setVisibleContent(e.key);

	const renderContent = () => {
		if(visibleContent === 'search') {
			return <SearchPage />;
		} {
			return <div>ERROR</div>;
		}
	}

	const renderMenu = () => (
		<Menu mode='horizontal' onClick={handleClick} selectedKeys={[visibleContent]} theme='dark'>
			<Menu.Item key='search' icon={<SearchOutlined />}>
				Search & Modify
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

export default SelectPage;