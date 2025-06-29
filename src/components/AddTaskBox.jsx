import { useState } from 'react';

export default function AddTaskBox({ addTask, categories }) {
  const [text, setText] = useState('');
  const [category, setCategory] = useState(categories[0]);

  const handleSubmit = e => {
    e.preventDefault();//dont allow white space 
    if (!text.trim()) return;
    addTask(text.trim(), category);
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

      <select value={category} onChange={e => setCategory(e.target.value)}>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>

      <button type="submit">Add task</button>
    </form>
  );
}
