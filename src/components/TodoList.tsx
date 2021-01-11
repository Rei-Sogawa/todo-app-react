import { FC, useCallback, useState } from 'react';
import TodoItem from './TodoItem';
import EditTodoForm from './EditTodoForm';

import type Todo from '../models/todo';
import type { HandleToggleCompleted, HandleClickEdit, HandleClickRemove } from './TodoItem';
import type {
  HandleChangeTodoTitleBeingEdited,
  HandleSubmitEditedTodo,
  HandleCancelEdit,
} from './EditTodoForm';

// props type
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

const TodoList: FC<Props> = (props) => {
  // todoBeingEdited
  const [todoBeingEdited, setTodoBeingEdited] = useState<Todo>();

  const isTodoBeingEdited = useCallback((todo: Todo) => todo.id === todoBeingEdited?.id, [
    todoBeingEdited,
  ]);

  // TodoItem の handler
  const handleToggleCompleted: HandleToggleCompleted = (todo) => {
    const { id, title, completed } = todo;
    props.handleUpdateTodo({ id, title, completed: !completed });
  };

  const handleClickEdit: HandleClickEdit = (todoId) => {
    setTodoBeingEdited(
      // spread 演算子で書くとエラーになるので
      Object.assign(
        {},
        props.todos.find((todo) => todo.id === todoId),
      ),
    );
  };

  const handleClickRemove: HandleClickRemove = (todoId) => {
    props.handleRemoveTodo({ id: todoId });
  };

  // EditTodoForm の handler
  const handleChangeTodoTitleBeingEdited: HandleChangeTodoTitleBeingEdited = (event) => {
    setTodoBeingEdited((prevObj) => Object.assign({}, prevObj, { title: event.target.value }));
  };

  const handleSubmitEditedTodo: HandleSubmitEditedTodo = (event) => {
    event.preventDefault();
    const { id, title, completed } = todoBeingEdited!;
    props.handleUpdateTodo({ id, title, completed });
    setTodoBeingEdited(undefined);
  };

  const handleCancelEdit: HandleCancelEdit = () => {
    setTodoBeingEdited(undefined);
  };

  return (
    <div className="flex flex-col space-y-1">
      {props.todos.map((todo) => (
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
