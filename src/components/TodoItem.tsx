import { FC } from 'react';
import { BsPencilSquare, BsFillTrashFill } from 'react-icons/bs';

import type Todo from '../models/todo';

// props type
export type HandleToggleCompleted = (todo: Todo) => void;
export type HandleClickEdit = (todoId: string) => void;
export type HandleClickRemove = (todoId: string) => void;

type Props = {
  todo: Todo;
  handleToggleCompleted: HandleToggleCompleted;
  handleClickEdit: HandleClickEdit;
  handleClickRemove: HandleClickRemove;
};

const TodoItem: FC<Props> = (props) => {
  return (
    <div className="sm:text-sm px-3 py-2 border border-gray-300 rounded-md">
      <div className="flex justify-between">
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={props.todo.completed}
            onChange={() => props.handleToggleCompleted(props.todo)}
            className="border-gray-300 rounded-sm appearance-none checked:bg-blue-600 checked:border-transparent focus:ring-0 focus:ring-offset-0"
          />
          <div>{props.todo.title}</div>
        </div>
        <div className="flex space-x-2">
          <button className="flex items-center">
            <BsPencilSquare
              onClick={() => props.handleClickEdit(props.todo.id)}
              className="h-4 w-4"
            />
          </button>
          <button className="flex items-center">
            <BsFillTrashFill
              onClick={() => props.handleClickRemove(props.todo.id)}
              className="h-4 w-4"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodoItem;
