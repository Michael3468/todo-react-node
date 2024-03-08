const TodoPriorities = ['low', 'middle', 'high'] as const;
type TodoPriority = (typeof TodoPriorities)[number];

export type { TodoPriority };
export { TodoPriorities };
