import { FC, ChangeEvent, FormEvent } from 'react';

export type HandleChangeNewTodoTitle = (event: ChangeEvent<HTMLInputElement>) => void;
export type HandleSubmitNewTodo = (event: FormEvent<HTMLFormElement>) => void;

export type Props = {
  newTodoTitle: string;
  handleChangeNewTodoTitle: HandleChangeNewTodoTitle;
  handleSubmitNewTodo: HandleSubmitNewTodo;
};

const CreateTodoForm: FC<Props> = (props) => (
  <form onSubmit={props.handleSubmitNewTodo}>
    <input
      type="text"
      value={props.newTodoTitle}
      onChange={props.handleChangeNewTodoTitle}
      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md px-8"
      placeholder="Add new todo"
      required
    />
  </form>
);

export default CreateTodoForm;
