import { ITodo } from '../../../types';

const filterTodosByResponsible = (responsibleToGroupBy: string, todos: ITodo[]) =>
  todos.filter((todo) => todo.responsible === responsibleToGroupBy);

export default filterTodosByResponsible;
