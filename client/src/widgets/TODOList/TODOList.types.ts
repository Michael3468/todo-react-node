export const SortConst = ['last updated', 'finish date'] as const;
type TSortConst = (typeof SortConst)[number];

export const SortAdminConst = ['last updated', 'finish date', 'responsible'] as const;
type TSortAdminConst = (typeof SortAdminConst)[number];

// eslint-disable-next-line import/prefer-default-export
export type { TSortConst, TSortAdminConst };
