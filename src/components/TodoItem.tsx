import { FC } from 'react';
import { BsPencilSquare, BsFillTrashFill } from 'react-icons/bs';

import type Todo from '../models/todo';

export type HandleToggleCompleted = (todo: Todo) => void;
export type HandleClickEdit = (todoId: string) => void;
export type HandleClickRemove = (todoId: string) => void;

type Props = {
  todo: Todo;
  handleToggleCompleted: HandleToggleCompleted;
  handleClickEdit: HandleClickEdit;
  handleClickRemove: HandleClickRemove;
};

const TodoItem: FC<Props> = ({
  todo,
  handleToggleCompleted,
  handleClickEdit,
  handleClickRemove,
}) => {
  return (
    <div className="px-3 py-2 border border-gray-300 rounded-md">
      <div className="flex justify-between">
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => handleToggleCompleted(todo)}
            className="checkbox"
          />
          <div>{todo.title}</div>
        </div>
        <div className="flex space-x-2">
          <button className="flex items-center">
            <BsPencilSquare onClick={() => handleClickEdit(todo.id)} className="h-4 w-4" />
          </button>
          <button className="flex items-center">
            <BsFillTrashFill onClick={() => handleClickRemove(todo.id)} className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodoItem;
