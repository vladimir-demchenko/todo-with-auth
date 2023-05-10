import React, { useState } from 'react'
import CreateTodoField from './create-todo-field/CreateTodoField'
import TodoItem from './item/TodoItem'
import { Button } from 'antd'
import AuthService from '../../../services/AuthService'
import {useNavigate} from 'react-router-dom'

const data = [
	{
		_id: 'wefw23',
		title: 'Finish the essay collaboration',
		isCompleted: false,
	},
	{
		_id: 'wefw23232',
		title: 'Read next chapter of the book',
		isCompleted: false,
	},
	{
		_id: 'wefw2qwefcev3',
		title: 'Send the finished assignment',
		isCompleted: false,
	},
]

const Home = () => {
	const [todos, setTodos] = useState(data)
	const navigate = useNavigate();

	const changeTodo = id => {
		const copy = [...todos]
		const current = copy.find(t => t._id === id)
		current.isCompleted = !current.isCompleted
		setTodos(copy)
	}

	const removeTodo = id => setTodos([...todos].filter(t => t._id !== id))

	const handleLogout = async () => {
		await AuthService.logout();
		localStorage.removeItem('token');
		navigate('/login');
	}

	return (
		<div className='text-white w-4/5 mx-auto'>
			<div className='flex'>
				<h1 className='text-2xl font-bold text-center mb-10'>Todo for junior</h1>
				<Button onClick={handleLogout} type='link'>Выйти</Button>
			</div>
			{todos.map(todo => (
				<TodoItem
					key={todo._id}
					todo={todo}
					changeTodo={changeTodo}
					removeTodo={removeTodo}
				/>
			))}
			<CreateTodoField setTodos={setTodos} />
		</div>
	)
}

export default Home
