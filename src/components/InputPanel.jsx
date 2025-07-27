import { useState } from 'react';
import './InputPanel.css';

export default function InputPanel({ addTask, categories, addCategory }) {
  const [text, setText] = useState('');
  const [category, setCategory] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedText = text.trim();
    const trimmedCategory = category.trim();
    if (!trimmedText) return;

    addTask(trimmedText, trimmedCategory);

    // If category is non-empty and new, add it to Firestore
    if (trimmedCategory && !categories.includes(trimmedCategory)) {
      addCategory(trimmedCategory);
    }

    // Clear inputs
    setText('');
    setCategory('');
  };

  return (
    <form onSubmit={handleSubmit} className="input-panel">
      <input
        type="text"
        value={text}
        placeholder="Add task title"
        onChange={e => setText(e.target.value)}
      />
      <input
        type="text"
        value={category}
        placeholder="Add category"
        onChange={e => setCategory(e.target.value)}
      />
      <button type="submit">Add Task</button>
    </form>
  );
}
