import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Menu, Switch } from 'antd';
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

const themeSelector = (state) => state.page.theme;

const SelectPage = () => {

	const dispatch = useDispatch();
	const theme = useSelector(themeSelector);
	const [visibleContent, setVisibleContent] = useState('manage');

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
		<Menu mode='horizontal' onClick={handleClick} selectedKeys={[visibleContent]} theme={`${theme}`}>
			<Menu.Item key='manage' icon={<SearchOutlined />}>
				Manage Media
			</Menu.Item>
		</Menu>
	);

	/*<Menu.Item key='export' icon={<ArrowUpOutlined />}>
				Export Data
			</Menu.Item>*/

	function onThemeToggle(checked) {
		console.log(`switch to ${checked}`);
		if (!checked){
			return dispatch({ type: 'ENABLE_DARK_THEME' });
		}
		return dispatch({ type: 'ENABLE_LIGHT_THEME' });
	}
	
	return (
		<div className='reader-page-wrapper'>
			<div className={`top-bar top-bar-${theme}`}>
			<Switch onChange={onThemeToggle} class='toggle-dark' checkedChildren="Light" unCheckedChildren="Dark" ></Switch>
			<LogoutButton/>
			</div>
			{renderMenu()}
			{renderContent()}
		</div>
	);
}

export default SelectPage;