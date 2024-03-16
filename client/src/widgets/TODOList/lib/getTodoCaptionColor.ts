import { ITodo } from '../ui/TODOItem';

type TCaptionColors = 'red' | 'green' | 'gray';

const getTodoCaptionColor = (todoItem: ITodo): TCaptionColors => {
  const finishDate = new Date(todoItem.finishDate);
  const currentDate = new Date();

  if (todoItem.status !== 'done' && finishDate < currentDate) return 'red';

  if (todoItem.status === 'done') return 'green';

  return 'gray';
};

export type { TCaptionColors };
export default getTodoCaptionColor;
