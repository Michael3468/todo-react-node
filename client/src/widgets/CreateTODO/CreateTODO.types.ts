type TTodoText = 'Edit' | 'Create';

const TodoPriorities = ['low', 'middle', 'high'] as const;
type TTodoPriority = (typeof TodoPriorities)[number];

const TodoStatuses = ['todo', 'in process', 'done', 'canceled'] as const;
type TTodoStatus = (typeof TodoStatuses)[number];

export type { TTodoPriority, TTodoStatus, TTodoText };
export { TodoPriorities, TodoStatuses };
