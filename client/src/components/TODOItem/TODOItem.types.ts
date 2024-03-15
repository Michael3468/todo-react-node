const TodoPriorities = ['low', 'middle', 'high'] as const;
type TTodoPriority = (typeof TodoPriorities)[number];

const TodoStatuses = ['todo', 'in process', 'done', 'canceled'] as const;
type TTodoStatus = (typeof TodoStatuses)[number];

interface ITodo {
  id: number;
  caption: string;
  description: string;
  finishDate: Date;
  createdAt: Date;
  updatedAt: Date;
  priority: TTodoPriority;
  status: TTodoStatus;
  creator: string;
  responsible: string;
}

export type { ITodo, TTodoPriority, TTodoStatus };
export { TodoPriorities, TodoStatuses };
