import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../app/store';
import { addTodo } from '../../features/todolist/todoSlice';
import Table from '../Table/Table';

import * as todoThunk from '../../features/todolist/todoThunk';

const TodoList: React.FC = () => {
    const [text, setText] = useState('');
    const { todos, state, error } = useSelector((state: RootState) => state.todos);
    const dispatch = useDispatch<AppDispatch>(); // Use AppDispatch type
    // const [todoList, setToDoList] = useState<Todo[]>([]);

    console.log('reducer ', todos);

    useEffect(() => {
        dispatch(todoThunk.getTodoList({ limit: 5, skip: 10 }));
    }, []);

    const handleAddTodo = () => {
        if (text.trim()) {
            dispatch(addTodo(text));
            setText('');
        }
    };

    return (
        <>
            <h1 className="text-center">Todo List</h1>
            {state === 'pending' && <p>Loading...</p>}
            {state === 'rejected' && <p>Error: {error}</p>}
            <div className='flex justify-center gap-10 text-black mt-10'>
                <input type="text" value={text} onChange={(e) => setText(e.target.value)} className='text-black w-[300px] rounded-sm' placeholder='Enter your task...'/>
                <button onClick={handleAddTodo}>Add Todo</button>
            </div>

            <div className="grid grid-cols-2 mt-10 px-2 gap-4 border-collapse border-r-2 border-red-300">
                <div className=''>
                    <h2 className="">Todo</h2>
                    <Table data={todos}></Table>
                </div>
                <div className="">
                    <h2>Completed Task</h2>
                    <Table data={todos} status={true}></Table>
                </div>
            </div>
            <div className='mt-20 text-center'>TodoApp Apply redux, redux-middlewares</div>
        </>
    );
};

export default TodoList;
