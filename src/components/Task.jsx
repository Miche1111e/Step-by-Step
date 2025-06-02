export default function Task({ task, complete, deleteTask }) {
  return (
    <div>
      <label>
        {task.text}
        <input
          type="checkbox"
          checked={task.done}
          onChange={complete}
        />
      </label>
      <button onClick={deleteTask}>Delete</button>
    </div>
  );
}
