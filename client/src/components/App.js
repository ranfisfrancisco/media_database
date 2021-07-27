import { useDispatch, useSelector } from 'react-redux';
//import { Form, Input, Button } from 'antd';

//import { adminLogin } from '../actions/admin';

import SelectPage from './pages';
import LoginPage from './pages/LoginPage';

import './css/App.css';

//const pageSelector = (state) => state.page;

// add form validation rules later
const App = () => {

	const dispatch = useDispatch();

	//const page = useSelector(pageSelector);

	// const renderPage = () => {
	// 	if(page.visible === 'homepage') {
	// 		return (
	// 			<div className='homepage-wrapper'>
	// 				{renderReaderLogin()}
	// 				{renderAdminLogin()}
	// 			</div>
	// 		);
	// 	} else if(page.visible === 'page') {
	// 		return <Page/>;
	// 	}
	// }

	// const readerOnFinished = (value) => {
	// 	dispatch(readerLogin(value.cardNumber));
	// }


	return (
	<div className='app-wrapper'>
	 		<LoginPage/>
	 	</div>
	);
};

export default App;
