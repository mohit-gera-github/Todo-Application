import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; 

function App() {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState('');

    useEffect(() => {
        axios.get('http://localhost:5000/todos')
            .then(response => {
                setTodos(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the todos!', error);
            });
    }, []);

    const addTodo = () => {
        if (newTodo.trim()) {
            axios.post('http://localhost:5000/todos', { text: newTodo })
                .then(response => {
                    setTodos([...todos, response.data]);
                    setNewTodo('');
                })
                .catch(error => {
                    console.error('There was an error adding the todo!', error);
                });
        }
    };

    const deleteTodo = (id) => {
        axios.delete(`http://localhost:5000/todos/${id}`)
            .then(() => {
                setTodos(todos.filter(todo => todo._id !== id));
            })
            .catch(error => {
                console.error('There was an error deleting the todo!', error);
            });
    };

    return (
        <div className="App">
            <h1>Todo List</h1>
            <div className="inputContainer">
                <input
                    type="text"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    className="inputField"
                    placeholder="Add a new todo..."
                />
                <button onClick={addTodo} className="addButton">Add Todo</button>
            </div>
            <ul className="todoList">
                {todos.map(todo => (
                    <li key={todo._id} className="todoItem">
                        {todo.text}
                        <button onClick={() => deleteTodo(todo._id)} className="deleteButton">Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;


