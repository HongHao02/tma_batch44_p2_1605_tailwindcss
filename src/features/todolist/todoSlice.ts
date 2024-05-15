import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../../types/Todo';
import { RootState } from '../../app/store';
import { getTodoList } from './todoThunk';

interface TodosState {
    todos: Todo[];
    error: string | undefined | null;
    state: 'pending' | 'fulfilled' | 'rejected' | 'none';
}

const initialState: TodosState = {
    todos: [],
    error: null,
    state: 'none',
};

const todosSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        addTodo: (state, action: PayloadAction<string>) => {
            const newTodo: Todo = {
                id: state.todos.length + 1,
                todo: action.payload,
                completed: false,
                userId: 1,
            };
            state.todos.push(newTodo);
        },
        toggleTodo: (state, action: PayloadAction<number>) => {
            const todo = state.todos.find((todo) => todo.id === action.payload);
            if (todo) {
                todo.completed = !todo.completed;
            }
        },
        removeTodo: (state, action: PayloadAction<number>) => {
            state.todos = state.todos.filter((todo) => todo.id !== action.payload);
        },
    },
    //   extraReducers(builder) {
    //     builder
    //         .addCase(getTodoList.pending, (state) => {
    //             //Xử lý sự kiện khi bắt đầu loading data
    //             state.state = 'pending';
    //         })
    //         .addCase(getTodoList.fulfilled, (state, action) => {
    //             console.log("ADDRESSES_THUNK_SUCCESS ", action.payload)
    //             // Xử lý sự kiện khi request thành công
    //             state.state = 'fulfilled';
    //             // Add any fetched posts to the array
    //             state.todos = action.payload;
    //         })
    //         .addCase(getTodoList.rejected, (state, action) => {
    //             //Xử lý khi request bị từ chối
    //             state.state = 'rejected';
    //             state.error = action.payload as string
    //         })
    // },
    extraReducers: (builder) => {
        builder
            .addCase(getTodoList.pending, (state) => {
                state.state = 'pending';
                state.error = null;
            })
            .addCase(getTodoList.fulfilled, (state, action: PayloadAction<Todo[]>) => {
                state.state = 'fulfilled';
                console.log("todos_from_thunk ", action.payload);
                state.todos = action.payload;
            })
            .addCase(getTodoList.rejected, (state, action) => {
                state.state = 'rejected';
                state.error = action.payload as string;
            });
    },
});

export const { addTodo, toggleTodo, removeTodo } = todosSlice.actions;
export const sellectToDos = (state: RootState) => state.todos;
export default todosSlice.reducer;
