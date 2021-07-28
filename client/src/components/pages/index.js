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

import ManageMediaPage from './ManageMediaPage';

//const readerUsernameSelector = (state) => state.page.reader.pname;

const SelectPage = () => {

	const [visibleContent, setVisibleContent] = useState('search');
	//const readerUsername = useSelector(readerUsernameSelector);

	const handleClick = (e) => setVisibleContent(e.key);

	const renderContent = () => {
		if(visibleContent === 'search') {
			return <ManageMediaPage />;
		} {
			return <div>PAGE NOT FOUND</div>;
		}
	}

	const renderMenu = () => (
		<Menu mode='horizontal' onClick={handleClick} selectedKeys={[visibleContent]} theme='dark'>
			<Menu.Item key='search' icon={<SearchOutlined />}>
				Manage Media
			</Menu.Item>
		</Menu>
	);
	
	return (
		<div className='reader-page-wrapper'>
			<LogoutButton/>
			{renderMenu()}
			{renderContent()}
		</div>
	);
}

export default SelectPage;