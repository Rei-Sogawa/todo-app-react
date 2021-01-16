import { FC, ChangeEvent, FormEvent, useRef, useEffect } from 'react';

export type HandleChangeTodoTitleBeingEdited = (event: ChangeEvent<HTMLInputElement>) => void;
export type HandleSubmitEditedTodo = (event: FormEvent<HTMLFormElement>) => void;
export type HandleCancelEdit = () => void;

type Props = {
  todoTitleBeingEdited: string;
  handleChangeTodoTitleBeingEdited: HandleChangeTodoTitleBeingEdited;
  handleSubmitEditedTodo: HandleSubmitEditedTodo;
  handleCancelEdit: HandleCancelEdit;
};

const EditTodoForm: FC<Props> = ({
  todoTitleBeingEdited,
  handleChangeTodoTitleBeingEdited,
  handleSubmitEditedTodo,
  handleCancelEdit,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <form onSubmit={handleSubmitEditedTodo}>
      <input
        type="text"
        value={todoTitleBeingEdited}
        onChange={handleChangeTodoTitleBeingEdited}
        onBlur={() => handleCancelEdit()}
        ref={inputRef}
        className="text-input"
        required
      />
    </form>
  );
};

export default EditTodoForm;
