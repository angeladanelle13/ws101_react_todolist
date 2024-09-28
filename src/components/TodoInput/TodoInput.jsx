import React, { useState, useEffect } from 'react';
import './TodoInput.css';

const TodoInput = ({ addTodo, editTodo, currentTodo }) => {
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    if (currentTodo) {
      setInputValue(currentTodo.title);
    }
  }, [currentTodo]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputValue) return;

    if (currentTodo) {
      editTodo({
        ...currentTodo,
        title: inputValue,
      });
    } else {
      addTodo(inputValue);
    }
    setInputValue('');
  };

  return (
    <div className="input-wrapper">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Add your task..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="input-field"
        />
        <button type="submit" className="add-button">
          {currentTodo ? 'Update' : 'Add'}
        </button>
      </form>
    </div>
  );
};

export default TodoInput;
