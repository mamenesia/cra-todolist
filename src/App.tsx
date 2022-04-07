import React, { useEffect } from 'react';
import './App.css';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { TodoList } from './features/todolist/Todolist';
import {
	initiateTodoAsync,
	statusTodo,
} from './features/todolist/todolistSlice';
import VerifyPage from './foundation/components/VerifyPage/VerifyPage';
function App() {
	const dispatch = useAppDispatch();
	const status = useAppSelector(statusTodo);
	const isLoading = status === 'loading';

	useEffect(() => {
		dispatch(initiateTodoAsync());
	}, []);
	return (
		<div>
			{isLoading ? (
				<VerifyPage loading={isLoading} title="Todolist" />
			) : (
				<TodoList />
			)}
		</div>
	);
}

export default App;
