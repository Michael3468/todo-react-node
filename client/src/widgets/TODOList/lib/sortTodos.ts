import { ITodo } from '../../../types';
import { TSortAdminConst } from '../TODOList.types';

const sortTodos = (todosArr: ITodo[], sortType: TSortAdminConst): ITodo[] => {
  switch (sortType) {
    case 'finish date':
      return [...todosArr].sort((a, b) => {
        const dateA = new Date(a.finishDate);
        const dateB = new Date(b.finishDate);
        return dateA.getTime() - dateB.getTime();
      });
    case 'responsible':
      return [...todosArr].sort((a, b) => Number(a.responsible) - Number(b.responsible));
    default:
      // last updated
      return [...todosArr].sort((a, b) => {
        const dateA = new Date(a.updatedAt);
        const dateB = new Date(b.updatedAt);
        return dateB.getTime() - dateA.getTime();
      });
  }
};

export default sortTodos;
