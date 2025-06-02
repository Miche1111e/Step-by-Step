import { useState } from 'react';

export default function AddTaskBox({ addTask }) {
  const [text, setText] = useState('');

  const handleSubmit = e => {
    e.preventDefault();//dont allow white space 
    if (!text.trim()) return;
    addTask(text.trim());
    setText('');//clear input after adding
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
