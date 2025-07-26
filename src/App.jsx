import { useEffect, useState } from 'react';
import AddTaskBox from './components/AddTaskBox';
import TaskList from './components/TaskList';
import CategoryBox from './components/CategoryBox';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './firebase';
import Login from './components/Login';
import Signup from './components/Signup';
import { db } from './firebase';
import {
  collection,
  query,
  where,
  onSnapshot,
  addDoc,
  deleteDoc,
  updateDoc,
  doc
} from "firebase/firestore";


export default function App() {
  const [tasks, setTasks] = useState([]);
  console.log(tasks);
  const categories = ["Work", "School", "Exercise", "Groceries", "Others"];
  const [user, setUser] = useState(null);
  const [showSignUp, setShowSignUp] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currUser) => {
      setUser(currUser);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
  if (!user) {
    setTasks([]);
    return;
  }

  const q = query(collection(db, "tasks"), where("uid", "==", user.uid));
  const unsubscribe = onSnapshot(q, (snapshot) => {
    const userTasks = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    setTasks(userTasks);
  });

  return () => unsubscribe(); // Clean up listener on unmount or user change
}, [user]);

  function authChange(currUser) {
    setUser(currUser);

    if (currUser) {
      const q = query(collection(db, "tasks"), where("uid", "==", currUser.uid));
      onSnapshot(q, (snapshot) => {
        const userTasks = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setTasks(userTasks);
      });
    } else {
      setTasks([]);
    }
  }

  function logOut() {
    signOut(auth);
  }

  async function addTask(text, category) {
    const newTask= { text, done: false, category, uid: user.uid, createdAt: Date.now()};
    await addDoc(collection(db, "tasks"), newTask);
  }

  async function completeTask(id) {
    const task = tasks.find(t => t.id === id);
    if (task) {
      await updateDoc(doc(db, "tasks", id), {
        done: !task.done
      })
    }
  }

  async function deleteTask(id) {
    await deleteDoc(doc(db, "tasks", id));
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
