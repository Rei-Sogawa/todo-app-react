import { FC, useState } from 'react';
import TodoItem from './TodoItem';
import EditTodoForm from './EditTodoForm';

import type Todo from '../models/todo';
import type { HandleToggleCompleted, HandleClickEdit, HandleClickRemove } from './TodoItem';
import type { HandleSubmitEditedTodo, HandleCancelEdit } from './EditTodoForm';

type HandleUpdateTodo = ({
  id,
  title,
  completed,
}: Pick<Todo, 'id' | 'title' | 'completed'>) => void;
type HandleRemoveTodo = ({ id }: Pick<Todo, 'id'>) => void;

type Props = {
  todos: ReadonlyArray<Todo>;
  handleRemoveTodo: HandleRemoveTodo;
  handleUpdateTodo: HandleUpdateTodo;
};

const TodoList: FC<Props> = ({ todos, handleRemoveTodo, handleUpdateTodo }) => {
  const [todoIdBeingEdited, setTodoIdBeingEdited] = useState<string>();

  const isTodoBeingEdited: (todo: Todo) => boolean = (todo) => todo.id === todoIdBeingEdited;

  // TodoItem の handler
  const handleToggleCompleted: HandleToggleCompleted = (todo) => {
    const { id, title, completed } = todo;
    handleUpdateTodo({ id, title, completed: !completed });
  };

  const handleClickEdit: HandleClickEdit = (todoId) => {
    setTodoIdBeingEdited(todoId);
  };

  const handleClickRemove: HandleClickRemove = (todoId) => {
    handleRemoveTodo({ id: todoId });
  };

  // EditTodoForm の handler
  const handleSubmitEditedTodo: HandleSubmitEditedTodo = (title) => {
    const todoBeingEdited = todos.find(isTodoBeingEdited);
    if (!todoBeingEdited) {
      throw new Error('can not find todoBeingEdited');
    }
    const { id, completed } = todoBeingEdited;
    handleUpdateTodo({ id, title, completed });
    setTodoIdBeingEdited(undefined);
  };

  const handleCancelEdit: HandleCancelEdit = () => {
    setTodoIdBeingEdited(undefined);
  };

  return (
    <div className="flex flex-col space-y-1">
      {todos.map((todo) => (
        <div key={todo.id}>
          {isTodoBeingEdited(todo) ? (
            <EditTodoForm
              todo={todo}
              handleSubmitEditedTodo={handleSubmitEditedTodo}
              handleCancelEdit={handleCancelEdit}
            />
          ) : (
            <TodoItem
              todo={todo}
              handleToggleCompleted={handleToggleCompleted}
              handleClickEdit={handleClickEdit}
              handleClickRemove={handleClickRemove}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default TodoList;
