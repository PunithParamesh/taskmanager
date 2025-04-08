import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import TaskForm from '../components/taskForm';
import TaskList from '../components/taskList';
import styles from '../styles/app.module.css';

function TaskPage() {
  const [tasks, setTasks] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));
  const token = user?.token;
  const {logout} = useAuth();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/api/tasks`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        setTasks(data);
      } catch (err) {
        console.error('Failed to fetch tasks:', err);
      }
    };
  
    if (token) fetchTasks();
  }, [token]);
  

  const addTask = async (task) => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/tasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(task),
      });
      const data = await res.json();
      setTasks((prev) => [...prev, data]);
    } catch (err) {
      console.error('Add task error:', err);
    }
  };

  const toggleTask = async (id) => {
    try {
      const taskToToggle = tasks.find((t) => t._id === id);
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/tasks/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ completed: !taskToToggle.completed }),
      });
      const updated = await res.json();
      setTasks((prev) =>
        prev.map((task) => (task._id === id ? updated : task))
      );
    } catch (err) {
      console.error('Toggle task error:', err);
    }
  };

  const deleteTask = async (id) => {
    console.log(id);
    try {
      await fetch(`${process.env.REACT_APP_API_URL}/api/tasks/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTasks((prev) => prev.filter((task) => task._id !== id));
    } catch (err) {
      console.error('Delete task error:', err);
    }
  };

  
    const handleLogout = () => {
        // localStorage.removeItem('user');
        logout();
        window.location.href = '/login'; 
    };
  

  return (
    <div className={styles.container}>
        <div className={styles.header}>
            <h1 className={styles.heading}>Task Manager</h1>
            <button onClick={handleLogout} className={styles.logoutBtn}>Logout</button>
        </div>
        <TaskForm onAdd={addTask} />
        <TaskList tasks={tasks} onToggle={toggleTask} onDelete={deleteTask} />
    </div>

  );
}

export default TaskPage;
