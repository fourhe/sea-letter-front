export type PageQuery<T = unknown> = {
  currentPage: number;
  pageSize: number;
  totalPages: number;
} & T;

export type PageQueryString = {
  page: number;
  size: number;
};
