import type {TrashDetail, TrashList} from '@/application/ports/trash';
import type {ITrashService, PageQueryString} from '@application/ports';
import Api from '@lib/axios';

class TrashService extends Api implements ITrashService {
  async deleteTrash(id: number): Promise<void> {
    await this.delete(`/trash/${id}`);
  }

  async restoreTrash(id: number): Promise<void> {
    await this.post(`/trash/${id}`);
  }

  async getTrashList(page: PageQueryString): Promise<TrashList> {
    const {data} = await this.get<TrashList, PageQueryString>('/trash', page);
    return data;
  }

  async getTrashDetail(id: number): Promise<TrashDetail> {
    const {data} = await this.get<TrashDetail>(`/trash/${id}`);
    return data;
  }
}

export default TrashService;
