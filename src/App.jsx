import { useState } from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';


export default function App() {
  const [todos, setTodos] = useState([]);

  const addTodo = text => {
    const newItem = {
      id: Date.now(),
      text,
      done: false
    };
    setTodos(prev => [newItem, ...prev]);
  };

  const toggleTodo = id => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    );
  };

  const deleteTodo = id => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  };

  return (
    <div>
      <h1>Step-by-Step To-Do</h1>
      <TodoForm onAdd={addTodo} />
      <TodoList todos={todos} onToggle={toggleTodo} onDelete={deleteTodo} />
    </div>
  );
}
