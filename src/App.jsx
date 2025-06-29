import { useEffect, useState } from 'react';
import AddTaskBox from './components/AddTaskBox';
import TaskList from './components/TaskList';
import CategoryBox from './components/CategoryBox';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './firebase';
import Login from './components/Login';
import Signup from './components/Signup';


export default function App() {
  const [tasks, setTasks] = useState([]);
  console.log(tasks);
  const categories = ["Work", "School", "Exercise", "Groceries", "Others"];
  const [user, setUser] = useState(null);
  const [showSignUp, setShowSignUp] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, authChange);
    return () => unsubscribe();
  }, []);

  function authChange(currUser) {
    setUser(currUser);
  }

  function logOut() {
    signOut(auth);
  }

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

  if (!user) {
    return showSignUp ? (
      <Signup onToggle={() => setShowSignUp(false)} />
    
    ) : (
      <Login onToggle={() => setShowSignUp(true)} />
    );
  }

  return (
    <div>
      <h1>Step-by-Step</h1>
      <button onClick={logOut}>LogOut</button>
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
