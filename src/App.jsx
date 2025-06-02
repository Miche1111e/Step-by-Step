import { useState } from 'react';
import AddTaskBox from './components/AddTaskBox';
import TaskList from './components/TaskList';


export default function App() {
  const [tasks, setTasks] = useState([]);

  function addTask(text) {
    const newTask= { id: Date.now(), text, done: false };
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
    )
  }

  function deleteTask(id) {
    setTasks(prev => prev.filter(task => task.id !== id));
  }

  return (
    <div>
      <h1>Step-by-Step</h1>
      <AddTaskBox addTask={addTask}/>
      <h2>TaskList</h2>
      <TaskList tasks={tasks} complete={completeTask} deleteTask={deleteTask}/>
    </div>
  );
}
