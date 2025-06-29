import { useState } from 'react';
import AddTaskBox from './components/AddTaskBox';
import TaskList from './components/TaskList';
import CategoryBox from './components/CategoryBox';


export default function App() {
  const [tasks, setTasks] = useState([]);
  console.log(tasks);
  const categories = ["Work", "School", "Exercise", "Groceries", "Others"];

  function addTask(text, category) {
    const newTask= { id: Date.now(), text, done: false, category};
    setTasks(prev => [newTask, ...prev]);
  }

  function completeTask(id) {
    setTasks(prev => 
      prev.map(task => {
        if(task.id === id) {
          return {id: task.id, text: task.text, done: !task.done };
        } else {
          return task;
        }
      })
    );
  }

  function deleteTask(id) {
    setTasks(prev => prev.filter(task => task.id !== id));
  }

  return (
    <div>
      <h1>Step-by-Step</h1>
      <AddTaskBox addTask={addTask} categories={categories} />
      <h2>TaskList</h2>
        <div className="card-grid">
          {categories.map(category => (
            <CategoryBox
              key={category}
              category={category}
              tasks={tasks.filter(task => task.category === category)}
              complete={completeTask}
              deleteTask={deleteTask}
            />
          ))}
        </div>
    </div>
  );
}
