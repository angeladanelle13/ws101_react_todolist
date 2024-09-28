import React from 'react';
import './TodoItem.css';

const TodoItem = ({ todo, onEdit, confirmDelete, toggleComplete }) => {
  return (
    <div className="todo-wrapper">
      <input
        type="checkbox"
        onChange={() => toggleComplete(todo)} 
        checked={todo.completed}
        className="checkbox"
      />
      <div className="todo-text">
        <span className={`task-name ${todo.completed ? 'completed' : ''}`}>
          {todo.text}
        </span>
        <div className="due-date">
          <span><i className="ri-alarm-line"></i></span>
          <span>{new Date(todo.dueDate).toLocaleString()}</span>
        </div>
      </div>
      <div className="button-group">
        <button onClick={() => onEdit(todo)} className="edit-button">
          <i className="ri-pencil-line"></i>
        </button>
        <button onClick={() => confirmDelete(todo.id)} className="delete-button">
          <i className="ri-delete-bin-2-line"></i>
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
