import { useState } from 'react';

export default function TodoForm({ onAdd }) {
  const [text, setText] = useState('');

  const handleSubmit = e => {
    e.preventDefault();//dont allow white space 
    if (!text.trim()) return;
    onAdd(text.trim());
    setText('');//set back to empty after adding task
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="Add a new task"
      />
      <button type="submit">Add task</button>
    </form>
  );
}
