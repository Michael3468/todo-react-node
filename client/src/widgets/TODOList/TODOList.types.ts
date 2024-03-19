export const GroupByFinishDateConst = ['day', 'week', 'more than week', 'all'] as const;
type TGroupByFinishDateConst = (typeof GroupByFinishDateConst)[number];

export const SortAdminConst = ['last updated', 'finish date', 'responsible'] as const;
type TSortAdminConst = (typeof SortAdminConst)[number];

export const SortConst = ['last updated', 'finish date'] as const;
type TSortConst = (typeof SortConst)[number];

export type { TGroupByFinishDateConst, TSortAdminConst, TSortConst };
