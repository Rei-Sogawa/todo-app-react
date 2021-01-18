import { FC, ChangeEvent, FormEvent, useRef, useEffect, useState } from 'react';

export type HandleChangeTodoTitleBeingEdited = (event: ChangeEvent<HTMLInputElement>) => void;
export type HandleSubmitEditedTodo = (title: string) => void;
export type HandleCancelEdit = () => void;

type Props = {
  currentTitle: string;
  handleSubmitEditedTodo: HandleSubmitEditedTodo;
  handleCancelEdit: HandleCancelEdit;
};

const EditTodoForm: FC<Props> = ({ currentTitle, handleSubmitEditedTodo, handleCancelEdit }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const [title, setTitle] = useState<string>(currentTitle);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleSubmitEditedTodo(title);
    setTitle('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onBlur={() => handleCancelEdit()}
        ref={inputRef}
        className="text-input"
        required
      />
    </form>
  );
};

export default EditTodoForm;
