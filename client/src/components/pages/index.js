import React from 'react';
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
	ArrowUpOutlined,
} from '@ant-design/icons';

import LogoutButton from '../LogoutButton';

import ManageMediaPage from './ManageMediaPage';

//const readerUsernameSelector = (state) => state.page.reader.pname;

const SelectPage = () => {

	const [visibleContent, setVisibleContent] = useState('manage');
	//const readerUsername = useSelector(readerUsernameSelector);

	const handleClick = (e) => setVisibleContent(e.key);

	const renderContent = () => {
		switch(visibleContent) {
			case 'manage':
				return <ManageMediaPage />;
			case 'export':
				return <div>Under Construction</div>;
			default:
				return <div>PAGE NOT FOUND</div>;
		}
	}

	const renderMenu = () => (
		<Menu mode='horizontal' onClick={handleClick} selectedKeys={[visibleContent]} theme='dark'>
			<Menu.Item key='manage' icon={<SearchOutlined />}>
				Manage Media
			</Menu.Item>
		</Menu>
	);

	/*<Menu.Item key='export' icon={<ArrowUpOutlined />}>
				Export Data
			</Menu.Item>*/
	
	return (
		<div className='reader-page-wrapper'>
			<LogoutButton/>
			{renderMenu()}
			{renderContent()}
		</div>
	);
}

export default SelectPage;