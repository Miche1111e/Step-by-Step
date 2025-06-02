import Task from './Task';

export default function TaskList({ tasks, complete, deleteTask }) {
  if (tasks.length === 0) {
    return <p>No tasks yet!</p>;
  } else {
    return (
    <div>
      {tasks.map(task => (
        <Task
          key={task.id}
          task={task}
          complete={() => complete(task.id)}
          deleteTask={() => deleteTask(task.id)}
        />
      ))}
    </div>
  );
  }  
}
