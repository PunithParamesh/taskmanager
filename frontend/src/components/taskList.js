
import React from 'react';
import TaskItem from './taskItem';
import styles from '../styles/taskList.module.css';

function TaskList({ tasks, onToggle, onDelete }) {

  if (tasks.length === 0) {
    return <p className={styles.empty}>No tasks yet. Add some!</p>;
  }
  //const token = JSON.parse(localStorage.getItem('user'))?.token;
  return (
    <div className={styles.list}>
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default TaskList;
