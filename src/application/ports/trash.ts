export type Trash = {
  id: number;
  title: string;
  deletedAt: string;
};

export default interface ITrashService {
  getTrashList(): Promise<Trash[]>;
}
