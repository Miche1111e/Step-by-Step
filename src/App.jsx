import { useEffect, useState } from 'react';
import TaskList from './components/TaskList';
import CategoryBox from './components/CategoryBox';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Signup from './components/Signup';
import InputPanel from './components/InputPanel';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './firebase';
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
  const [categories, setCategories] = useState([]);
  const [user, setUser] = useState(null);
  const [showSignUp, setShowSignUp] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, setUser);
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

    return () => unsubscribe();
  }, [user]);

  useEffect(() => {
    if (!user) {
      setCategories([]);
      return;
    }

    const q = query(collection(db, "categories"), where("uid", "==", user.uid));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const userCategories = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setCategories(userCategories.map(c => c.name));
    });

    return () => unsubscribe();
  }, [user]);


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

  async function addCategory(name) {
    await addDoc(collection(db, "categories"), {
      name,
      uid: user.uid,
      createdAt: Date.now()
    });
  }

  if (!user) {
    return showSignUp ? (
      <Signup onToggle={() => setShowSignUp(false)} />
    ) : (
      <Login onToggle={() => setShowSignUp(true)} />
    );
  }

  return (
    <Dashboard user= {user} logOut={logOut}>
      <InputPanel addTask={addTask} categories={categories} addCategory={addCategory} />
      <h2>To-Do List</h2>
        <div className="card-grid">
          {categories
            .filter(c => c.trim() !== '')
            .map(category => {
              const tasksInBox = tasks.filter(task => task.category === category);
              if (category.trim() === '' || tasksInBox.length === 0) return null;
              return (
                <CategoryBox
                  key={category}
                  category={category}
                  tasks={tasks.filter(task => task.category === category)}
                  complete={completeTask}
                  deleteTask={deleteTask}
                />
              );
          })}
        </div>
    </Dashboard>
  );
}
