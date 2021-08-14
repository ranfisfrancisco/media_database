import React from 'react';
import { useSelector } from 'react-redux';

import SelectPage from './pages';
import LoginPage from './pages/LoginPage';

import './css/App.css';

const pageSelector = (state) => state.page;

// add form validation rules later
const App = () => {

	const page = useSelector(pageSelector);

	const renderPage = () => {
		if (page.visible === 'loginpage') {
			return (
				<div className='login-wrapper'>
					{<LoginPage/>}
				</div>
			);
		} else if (page.visible === 'managemediapage') {
			return (<div className='managemedia-wrapper'>
					{<SelectPage/>}
			</div>)
		} else {
			return `Error with page.visible state ${page.visible}`
		}
	}

	return (
	<div className={`app-wrapper app-wrapper-${page.theme}`}>
	 		{renderPage()}
	</div>
	);
};

export default App;
