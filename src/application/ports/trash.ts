export type Trash = {
  id: number;
  title: string;
  deletedAt: string;
  letterId: number;
};

export type TrashDetail = {
  content: string;
} & Trash;

export default interface ITrashService {
  getTrashList(): Promise<Trash[]>;

  getTrashDetail(id: number): Promise<TrashDetail>;

  deleteTrash(id: number): Promise<void>;

  restoreTrash(id: number): Promise<void>;
}
