import { FC, useEffect, useState } from 'react';
import CreateTodoForm from './components/CreateTodoForm';
import TodoList from './components/TodoList';
import * as TodosService from './local-storages/todos-service';

import type Todo from './models/todo';
import type { HandleChangeNewTodoTitle, HandleSubmitNewTodo } from './components/CreateTodoForm';

type Todos = ReadonlyArray<Todo>;
type FetchTodos = () => void;
type CreateTodo = ({ title, completed }: Pick<Todo, 'title' | 'completed'>) => void;
type UpdateTodo = ({ id, title, completed }: Pick<Todo, 'id' | 'title' | 'completed'>) => void;
type RemoveTodo = ({ id }: Pick<Todo, 'id'>) => void;

const App: FC = () => {
  // todos-store のようなところ
  // custom hook 化する？
  const [todos, setTodos] = useState<Todos>([]);

  const fetchTodos: FetchTodos = () => {
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

  // CreateTodoForm に関わる state と handler
  const [newTodoTitle, setNewTodoTitle] = useState<string>('');

  const handleChangeNewTodoTitle: HandleChangeNewTodoTitle = (event) => {
    setNewTodoTitle(event.target.value);
  };

  const handleSubmitNewTodo: HandleSubmitNewTodo = (event) => {
    event.preventDefault();
    createTodo({ title: newTodoTitle, completed: false });
    setNewTodoTitle('');
  };

  return (
    <div className="max-w-lg mx-auto py-5 flex-col space-y-3">
      <CreateTodoForm
        newTodoTitle={newTodoTitle}
        handleChangeNewTodoTitle={handleChangeNewTodoTitle}
        handleSubmitNewTodo={handleSubmitNewTodo}
      />
      <TodoList todos={todos} handleUpdateTodo={updateTodo} handleRemoveTodo={removeTodo} />
    </div>
  );
};

export default App;
