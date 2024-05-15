import { combineReducers } from "@reduxjs/toolkit";

import todoReducer from './todolist';

const rootReducer= combineReducers({
    todoList: todoReducer,
})
export default rootReducer;