import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';

import reducers from './reducers';

export default configureStore({
	reducer: reducers,
	middleware: [...getDefaultMiddleware()],
});
