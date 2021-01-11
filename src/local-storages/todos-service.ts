import Todo from '../models/todo';
import { nanoid } from 'nanoid';

const STORAGE_KEY = 'todos';

const getTodos = (): ReadonlyArray<Todo> => {
  const storedTodos: string | null = localStorage.getItem(STORAGE_KEY);
  const todos: ReadonlyArray<Todo> = storedTodos ? JSON.parse(storedTodos) : [];
  return todos;
};

const postTodo = ({
  title,
  completed,
}: Pick<Todo, 'title' | 'completed'>): void => {
  const newTodo: Todo = {
    id: nanoid(),
    title,
    completed,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };
  const todos = getTodos();
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...todos, newTodo]));
};

const putTodo = ({
  id,
  title,
  completed,
}: Pick<Todo, 'id' | 'title' | 'completed'>): void => {
  const todos = getTodos();
  const editedTodo: Todo = Object.assign(
    {},
    todos.find((todo) => todo.id === id),
    { title, completed, updatedAt: Date.now() },
  );
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(todos.map((todo) => (todo.id === id ? editedTodo : todo))),
  );
};

const deleteTodo = ({ id }: Pick<Todo, 'id'>): void => {
  const todos = getTodos();
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(todos.filter((todo) => todo.id !== id)),
  );
};

export { getTodos, postTodo, putTodo, deleteTodo };
