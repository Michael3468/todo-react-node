const TodoPriorities = ['low', 'middle', 'high'] as const;
type TodoPriority = (typeof TodoPriorities)[number];

const TodoStatuses = ['todo', 'in process', 'done', 'canceled'] as const;
type TodoStatus = (typeof TodoStatuses)[number];

export type { TodoPriority, TodoStatus };
export { TodoPriorities, TodoStatuses };
