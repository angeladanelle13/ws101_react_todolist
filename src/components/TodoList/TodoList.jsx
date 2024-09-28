import React from 'react';
import TodoItem from '../TodoItem/TodoItem';
import './TodoList.css';

const TodoList = ({ todos, onDelete, onEdit, toggleComplete }) => {
  return (
    <div className="todo-list">
      {todos.length > 0 ? (
        todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onEdit={onEdit}
            confirmDelete={onDelete} 
            toggleComplete={toggleComplete} 
          />
        ))
      ) : (
        <p className="no-tasks">No tasks available!</p>
      )}
    </div>
  );
};

export default TodoList;
