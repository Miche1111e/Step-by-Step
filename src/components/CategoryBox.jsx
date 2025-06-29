import Task from './Task';

export default function CategoryBox({ category, tasks, complete, deleteTask }) {
  const categoryColors = {
        Work: '#ffeeba',
        School: '#cce5ff',
        Exercise: '#d4edda',
        Groceries: '#f8d7da',
        Others: '#e2e3e5'
    };

const bgColor = categoryColors[category] || '#f3f3f3';

return (
    <div className="categoryBox" style={{backgroundColor : bgColor}}>
        <h3>{category}</h3>
        {tasks.length === 0 ? (
        <p>No tasks yet!</p>
        ) : (
        tasks.map(task => (
            <Task
            key={task.id}
            task={task}
            complete={() => complete(task.id)}
            deleteTask={() => deleteTask(task.id)}
            />
        ))
        )}
    </div>
  );
}
