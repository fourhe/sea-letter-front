export type PageQuery<T = unknown> = {
  currentPage: number;
  pageSize: number;
  totalPage: number;
} & T;

export type PageQueryString = {
  page: number;
  size: number;
};
