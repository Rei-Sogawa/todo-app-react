import { useState, useEffect } from 'react';
import Todo from '../models/todo';
import * as TodosService from '../local-storages/todos-service';

type Todos = ReadonlyArray<Todo>;
type CreateTodo = ({ title, completed }: Pick<Todo, 'title' | 'completed'>) => void;
type UpdateTodo = ({ id, title, completed }: Pick<Todo, 'id' | 'title' | 'completed'>) => void;
type RemoveTodo = ({ id }: Pick<Todo, 'id'>) => void;

type UseTodos = () => {
  todos: Todos;
  createTodo: CreateTodo;
  updateTodo: UpdateTodo;
  removeTodo: RemoveTodo;
};

const useTodos: UseTodos = () => {
  const [todos, setTodos] = useState<Todos>([]);

  const fetchTodos: () => void = () => {
    setTodos(TodosService.getTodos());
  };

  const createTodo: CreateTodo = ({ title, completed }) => {
    TodosService.postTodo({ title, completed });
    fetchTodos();
  };

  const updateTodo: UpdateTodo = ({ id, title, completed }) => {
    TodosService.putTodo({ id, title, completed });
    fetchTodos();
  };

  const removeTodo: RemoveTodo = ({ id }) => {
    TodosService.deleteTodo({ id });
    fetchTodos();
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return { todos, createTodo, updateTodo, removeTodo };
};

export default useTodos;
