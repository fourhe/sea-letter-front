import type {PageQuery, PageQueryString} from '@application/ports/common';

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

export default interface ITrashService {
  getTrashList(page: PageQueryString): Promise<TrashList>;

  getTrashDetail(id: number): Promise<TrashDetail>;

  deleteTrash(id: number): Promise<void>;

  restoreTrash(id: number): Promise<void>;
}
