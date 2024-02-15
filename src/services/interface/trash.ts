import type {PageQuery, PageQueryString} from './common';

export type Trash = {
  id: number;
  title: string;
  deletedAt: string;
  letterId: number;
};

export type TrashDetail = {
  content: string;
} & Trash;

export type TrashList = PageQuery<{
  trashListResponses: Trash[];
}>;

export type TrashFilterType = 'reply' | 'letter';

export type TrashListQueryString = PageQueryString & {
  type: TrashFilterType;
};

export default interface ITrashService {
  getTrashList(page: TrashListQueryString): Promise<TrashList>;

  getTrashDetail(id: number): Promise<TrashDetail>;

  deleteTrash(id: number): Promise<void>;

  restoreTrash(id: number): Promise<void>;
}
