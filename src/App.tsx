import { FC, useState } from 'react';
import CreateTodoForm from './components/CreateTodoForm';
import TodoList from './components/TodoList';
import useTodos from './hooks/use-todos';

import type { HandleChangeNewTodoTitle, HandleSubmitNewTodo } from './components/CreateTodoForm';

const App: FC = () => {
  // todos store
  // そもそも store ってなんだ？
  const { todos, createTodo, updateTodo, removeTodo } = useTodos();

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
