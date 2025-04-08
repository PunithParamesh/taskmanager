import React from 'react';
import styles from '../styles/taskItem.module.css';

function TaskItem({ task, onToggle, onDelete }) {
  return (
    <div className={`${styles.taskItem} ${task.completed ? styles.completed : ''}`}>
      <div className={styles.info} onClick={() => onToggle(task._id)}>
        <input
          type="checkbox"
          checked={task.completed}
          onChange={()=> onToggle(task.id)}
        />
        <div className={styles.texts}>
          <span className={styles.title}>{task.title}</span>
          <span className={styles.category}>[{task.category}]</span>
        </div>
      </div>
      <button className={styles.deleteButton} onClick={() => onDelete(task._id)}>
        ❌
      </button>
    </div>
  );
}

export default TaskItem;
