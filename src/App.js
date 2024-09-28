import React, { useState } from 'react';
import TodoList from './components/TodoList/TodoList';
import Datetime from 'react-datetime'; 
import 'react-datetime/css/react-datetime.css'; 
import './App.css';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [filter, setFilter] = useState('All');
  const [sort, setSort] = useState('Alphabetical Ascending');
  const [datePickerKey, setDatePickerKey] = useState(0);
  const [showAddTask, setShowAddTask] = useState(false);
  const [isEditing, setIsEditing] = useState(false); 
  const [currentTask, setCurrentTask] = useState(null); 

  const addTodo = () => {
    if (!inputValue && !dueDate) {
      alert('Please enter a task and select a date and time.');
      return;
    }
    if (!inputValue) {
      alert('Please enter a task.');
      return;
    }
    if (!dueDate) {
      alert('Please select a date and time.');
      return;
    }

    const confirmSave = window.confirm("Are you sure you want to save this task?");
    if (!confirmSave) return;

    if (isEditing && currentTask) {
      setTodos(todos.map(todo =>
        todo.id === currentTask.id ? { ...todo, text: inputValue, dueDate } : todo
      ));
      setIsEditing(false);
      setCurrentTask(null); 
    } else {
      setTodos([...todos, { id: Date.now(), text: inputValue, dueDate, completed: false }]);
    }

    setInputValue('');
    setDueDate('');
    setDatePickerKey(prevKey => prevKey + 1);
    setShowAddTask(false);
  };

  const cancelAddTodo = () => {
    const confirmCancel = window.confirm("Are you sure you want to cancel?");
    if (!confirmCancel) return;

    setShowAddTask(false);
    setInputValue('');
    setDueDate('');
    setIsEditing(false); 
    setCurrentTask(null); 
  };

  const startEditTask = (task) => {
    setCurrentTask(task);
    setInputValue(task.text);
    setDueDate(task.dueDate);
    setIsEditing(true);
    setShowAddTask(true); 
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'All') return true;
    if (filter === 'Completed') return todo.completed;
    if (filter === 'Pending') return !todo.completed;
    return true;
  });

  const sortedTodos = filteredTodos.sort((a, b) => {
    if (sort.includes('Alphabetical')) {
      return sort.includes('Descending') ? b.text.localeCompare(a.text) : a.text.localeCompare(b.text);
    }
    if (sort.includes('Date')) {
      return sort.includes('Descending') ? new Date(b.dueDate) - new Date(a.dueDate) : new Date(a.dueDate) - new Date(b.dueDate);
    }
    return 0;
  });

  const deleteTodo = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this task?");
    if (confirmDelete) {
      setTodos(todos.filter(todo => todo.id !== id));
    }
  };

  const toggleComplete = (todo) => {
    setTodos(todos.map(t => t.id === todo.id ? { ...t, completed: !t.completed } : t));
  };

  const totalTasks = todos.length;
  const pendingTasks = todos.filter(todo => !todo.completed).length;
  const completedTasks = todos.filter(todo => todo.completed).length;

  return (
    <div className="app-container">
      <div className="app-wrapper">
        <h1>To-Do List</h1>

        {!showAddTask && (
          <button onClick={() => setShowAddTask(true)} className="add-task-btn">
            <i className="ri-add-fill"></i>
          </button>
        )}

        {showAddTask && (
          <div className="add-task-modal">
            <div className="modal-content">
              <div className="input-wrapper">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={isEditing ? "Edit task..." : "Add a new task..."}
                  className="task-input"
                />
                <Datetime
                  key={datePickerKey}
                  value={dueDate}
                  onChange={(date) => setDueDate(date)}
                  dateFormat="YYYY-MM-DD"
                  timeFormat="HH:mm"
                  inputProps={{ 
                    placeholder: 'Select date and time',
                    readOnly: true
                  }}
                  className="datetime-input"
                />
              </div>
              <div className="modal-button-wrapper">
                <button onClick={addTodo} className="save-btn">
                  {isEditing ? 'Update' : 'Save'}
                </button>
                <button onClick={cancelAddTodo} className="cancel-btn">Cancel</button>
              </div>
            </div>
          </div>
        )}

        <div className="filter-sort-wrapper">
          <div className="filter-options">
            <button onClick={() => setFilter('All')} className={filter === 'All' ? 'active' : ''}>
              All {totalTasks > 0 ? `(${totalTasks})` : ''}
            </button>
            <button onClick={() => setFilter('Pending')} className={filter === 'Pending' ? 'active' : ''}>
              Pending {pendingTasks > 0 ? `(${pendingTasks})` : ''}
            </button>
            <button onClick={() => setFilter('Completed')} className={filter === 'Completed' ? 'active' : ''}>
              Completed {completedTasks > 0 ? `(${completedTasks})` : ''}
            </button>
          </div>
          <div className="sort-options">
            <span>Sort by: </span>
            <select onChange={(e) => setSort(e.target.value)} value={sort}>
              <option value="Alphabetical Ascending">Alphabetical ↑</option>
              <option value="Alphabetical Descending">Alphabetical ↓</option>
              <option value="Date Ascending">Date ↑</option>
              <option value="Date Descending">Date ↓</option>
            </select>
          </div>
        </div>

        <TodoList 
          todos={sortedTodos} 
          onDelete={deleteTodo} 
          onEdit={startEditTask} 
          toggleComplete={toggleComplete} 
        />
      </div>
    </div>
  );
};

export default App;
