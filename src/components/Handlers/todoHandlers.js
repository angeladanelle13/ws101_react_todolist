
import { v4 as uuidv4 } from 'uuid';

export const addTaskHandler = (title, todos) => {
  return [...todos, { id: uuidv4(), title }];
};

export const editTaskHandler = (updatedTodo, todos) => {
  return todos.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo));
};

export const deleteTaskHandler = (id, todos) => {
  return todos.filter((todo) => todo.id !== id);
};
