import { FC, ChangeEvent, FormEvent, useRef, useEffect } from 'react';

export type HandleChangeTodoTitleBeingEdited = (event: ChangeEvent<HTMLInputElement>) => void;
export type HandleSubmitEditedTodo = (event: FormEvent<HTMLFormElement>) => void;
export type HandleCancelEdit = () => void;

export type Props = {
  todoTitleBeingEdited: string;
  handleChangeTodoTitleBeingEdited: HandleChangeTodoTitleBeingEdited;
  handleSubmitEditedTodo: HandleSubmitEditedTodo;
  handleCancelEdit: HandleCancelEdit;
};

const EditTodoForm: FC<Props> = (props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <form onSubmit={props.handleSubmitEditedTodo}>
      <input
        type="text"
        value={props.todoTitleBeingEdited}
        onChange={props.handleChangeTodoTitleBeingEdited}
        onBlur={() => props.handleCancelEdit()}
        ref={inputRef}
        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md px-8"
        required
      />
    </form>
  );
};

export default EditTodoForm;
