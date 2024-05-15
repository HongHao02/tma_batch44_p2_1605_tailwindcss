import { configureStore } from '@reduxjs/toolkit';

import todoReducer from '../features/todolist';

const store = configureStore({
    reducer: {
        todos: todoReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
