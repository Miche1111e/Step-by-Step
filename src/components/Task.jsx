export default function Task({ task, complete, deleteTask }) {
  return (
    <div>
      <button onClick={deleteTask}>Delete</button>
      <label style={{textDecoration: task.done ? 'line-through' : 'none'}}>
        <input
          type="checkbox"
          checked={task.done}
          onChange={complete}
        />
        {task.text}
      </label>
    </div>
  );
}
