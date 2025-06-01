export default function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <div>
      <label>
        <input
          type="checkbox"
          checked={todo.done}
          onChange={onToggle}
        />
        {todo.text}
      </label>
      <button onClick={onDelete}>Delete</button>
    </div>
  );
}
