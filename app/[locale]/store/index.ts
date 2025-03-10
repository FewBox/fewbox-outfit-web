import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../reducers/root';
import rootEpic from '../epics/root';
import { createEpicMiddleware } from 'redux-observable';
import { Store } from '../reducers/StateTypes';


const epicMiddleware = createEpicMiddleware<unknown, unknown, Store, unknown>();

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(epicMiddleware), // Add custom middleware
    devTools: process.env.NODE_ENV !== 'production' // Enable dev tools in development
});

// Run the root epic after initializing the store
epicMiddleware.run(rootEpic);

export default store;