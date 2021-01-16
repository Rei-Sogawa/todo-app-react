import { FC, useState } from 'react';
import TodoItem from './TodoItem';
import EditTodoForm from './EditTodoForm';

import type Todo from '../models/todo';
import type { HandleToggleCompleted, HandleClickEdit, HandleClickRemove } from './TodoItem';
import type {
  HandleChangeTodoTitleBeingEdited,
  HandleSubmitEditedTodo,
  HandleCancelEdit,
} from './EditTodoForm';

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
  const [todoBeingEdited, setTodoBeingEdited] = useState<Todo | null>(null);

  const isTodoBeingEdited: (todo: Todo) => boolean = (todo) => todo.id === todoBeingEdited?.id;

  // TodoItem の handler
  const handleToggleCompleted: HandleToggleCompleted = (todo) => {
    const { id, title, completed } = todo;
    handleUpdateTodo({ id, title, completed: !completed });
  };

  const handleClickEdit: HandleClickEdit = (todoId) => {
    setTodoBeingEdited({ ...todos.find((todo) => todo.id === todoId) } as Todo);
  };

  const handleClickRemove: HandleClickRemove = (todoId) => {
    handleRemoveTodo({ id: todoId });
  };

  // EditTodoForm の handler
  const handleChangeTodoTitleBeingEdited: HandleChangeTodoTitleBeingEdited = (event) => {
    setTodoBeingEdited((prevObj) => ({ ...prevObj, title: event.target.value } as Todo));
  };

  const handleSubmitEditedTodo: HandleSubmitEditedTodo = (event) => {
    event.preventDefault();
    const { id, title, completed } = todoBeingEdited!;
    handleUpdateTodo({ id, title, completed });
    setTodoBeingEdited(null);
  };

  const handleCancelEdit: HandleCancelEdit = () => {
    setTodoBeingEdited(null);
  };

  return (
    <div className="flex flex-col space-y-1">
      {todos.map((todo) => (
        <div key={todo.id}>
          {isTodoBeingEdited(todo) ? (
            <EditTodoForm
              todoTitleBeingEdited={todoBeingEdited!.title}
              handleChangeTodoTitleBeingEdited={handleChangeTodoTitleBeingEdited}
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
