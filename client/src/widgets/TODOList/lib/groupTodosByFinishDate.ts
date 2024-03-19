import { TGroupByFinishDateConst } from '../TODOList.types';
import { ITodo } from '../ui/TODOItem';

const groupTodosByFinishDate = (
  groupByFinishDate: TGroupByFinishDateConst | string,
  todos: ITodo[],
) => {
  const today = new Date();
  const startWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime();

  const WEEK = 1000 * 60 * 60 * 24 * 7;
  const endWeek = startWeek + WEEK;

  switch (groupByFinishDate as TGroupByFinishDateConst) {
    case 'day':
      return todos.filter((todo) => {
        const todoDate = new Date(todo.finishDate).getDate();

        const todayDate = today.getDate();
        return todoDate === todayDate;
      });
    case 'week':
      return todos.filter((todo) => {
        const finishDate = new Date(todo.finishDate).getTime();
        return finishDate >= startWeek && finishDate <= endWeek;
      });
    case 'more than week':
      return todos.filter((todo) => {
        const finishDate = new Date(todo.finishDate).getTime();
        return finishDate >= endWeek;
      });
    default:
      return todos;
  }
};

export default groupTodosByFinishDate;
