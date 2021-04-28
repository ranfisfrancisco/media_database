import { useState } from 'react';
import { Menu } from 'antd';
import {
	SearchOutlined,
	PlusOutlined,
	UserAddOutlined,
	InfoCircleOutlined,
	OrderedListOutlined,
	QuestionCircleOutlined,
} from '@ant-design/icons';

import AddDocPage from './AddDocPage';
import AddReaderPage from './AddReaderPage';
import AverageFinePage from './AverageFinePage';
import BranchInfoPage from './BranchInfoPage';
import SearchDocPage from './SearchDocPage';
import TopBorrowedBooksBranchPage from './TopBorrowedBooksBranchPage';
import TopBorrowedBooksLibraryPage from './TopBorrowedBooksLibraryPage';
import TopBorrowedLibBooksByYearPage from './TopBorrowedLibBooksByYearPage';
import TopBranchBorrowersPage from './TopBranchBorrowersPage';
import TopLibraryBorrowersPage from './TopLibraryBorrowersPage';

const AdminPage = () => {

	const [visibleContent, setVisibleContent] = useState('addDoc');

	const handleClick = (e) => setVisibleContent(e.key);

	const renderContent = () => {
		if(visibleContent === 'addDoc') {
			return <AddDocPage />;
		} else if(visibleContent === 'searchDoc') {
			return <SearchDocPage />;
		} else if(visibleContent === 'addReader') {
			return <AddReaderPage />;
		} else if(visibleContent === 'branchInfo') {
			return <BranchInfoPage />;
		} else if(visibleContent === 'topBranchBorrowers') {
			return <TopBranchBorrowersPage/>;
		} else if(visibleContent === 'topLibraryBorrowers') {
			return <TopLibraryBorrowersPage/>;
		} else if(visibleContent === 'topBorrowedBooksBranch') {
			return <TopBorrowedBooksBranchPage />;
		} else if(visibleContent === 'topBorrowedBooksLibrary') {
			return <TopBorrowedBooksLibraryPage />;
		} else if(visibleContent === 'topBorrowedBooksLibraryByYear') {
			return <TopBorrowedLibBooksByYearPage />;
		} else if(visibleContent === 'averageBorrowingFine') {
			return <AverageFinePage />;
		}
	}

	const renderMenu = () => (
		<Menu mode='horizontal' onClick={handleClick} selectedKeys={[visibleContent]}>
			<Menu.Item key='addDoc' icon={<PlusOutlined />}>
				Add Document
			</Menu.Item>
			<Menu.Item key='searchDoc' icon={<SearchOutlined />}>
				Search Document
			</Menu.Item>
			<Menu.Item key='addReader' icon={<UserAddOutlined />}>
				Add Reader
			</Menu.Item>
			<Menu.Item key='branchInfo' icon={<InfoCircleOutlined />}>
				Branch Info
			</Menu.Item>
			<Menu.Item key='topBranchBorrowers' icon={<OrderedListOutlined />}>
				Top Branch Borrowers
			</Menu.Item>
			<Menu.Item key='topLibraryBorrowers' icon={<OrderedListOutlined />}>
				Top Library Borrowers
			</Menu.Item>
			<Menu.Item key='topBorrowedBooksBranch' icon={<OrderedListOutlined />}>
				Top Borrowed Books Branch
			</Menu.Item>
			<Menu.Item key='topBorrowedBooksLibrary' icon={<OrderedListOutlined />}>
				Top Borrowed Books Library
			</Menu.Item>
			<Menu.Item key='topBorrowedBooksLibraryByYear' icon={<OrderedListOutlined />}>
				Top Borrowed Books Library by Year
			</Menu.Item>
			<Menu.Item key='averageBorrowingFine' icon={<QuestionCircleOutlined />}>
				Average Fine
			</Menu.Item>
		</Menu>
	);

	return (
		<div className='admin-page-wrapper'>
			{renderMenu()}
			{renderContent()}
		</div>
	);	
}

export default AdminPage;
