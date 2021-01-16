import { FC, ChangeEvent, FormEvent } from 'react';

export type HandleChangeNewTodoTitle = (event: ChangeEvent<HTMLInputElement>) => void;
export type HandleSubmitNewTodo = (event: FormEvent<HTMLFormElement>) => void;

type Props = {
  newTodoTitle: string;
  handleChangeNewTodoTitle: HandleChangeNewTodoTitle;
  handleSubmitNewTodo: HandleSubmitNewTodo;
};

const CreateTodoForm: FC<Props> = ({
  newTodoTitle,
  handleChangeNewTodoTitle,
  handleSubmitNewTodo,
}) => (
  <form onSubmit={handleSubmitNewTodo}>
    <input
      type="text"
      value={newTodoTitle}
      onChange={handleChangeNewTodoTitle}
      className="text-input"
      placeholder="Add new todo"
      required
    />
  </form>
);

export default CreateTodoForm;
