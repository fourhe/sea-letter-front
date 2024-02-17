import type {
  TrashDetail,
  TrashList,
  TrashListQueryString,
} from './interface/trash';

import Api from '@lib/axios';
import type {ITrashService} from '@services/interface';

class TrashService extends Api implements ITrashService {
  async deleteTrash(id: number): Promise<void> {
    await this.delete(`/trash/${id}`);
  }

  async restoreTrash(id: number): Promise<void> {
    await this.post(`/trash/${id}`);
  }

  async getTrashList(page: TrashListQueryString): Promise<TrashList> {
    const {data} = await this.get<TrashList, TrashListQueryString>(
      '/trash',
      page,
    );
    return data;
  }

  async getTrashDetail(id: number): Promise<TrashDetail> {
    const {data} = await this.get<TrashDetail>(`/trash/${id}`);
    return data;
  }
}

const repository = new TrashService();

export default repository;
