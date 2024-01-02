import {Trash} from '@/application/ports/trash';
import {ITrashService} from '@application/ports';
import Api from '@lib/axios';

class TrashService extends Api implements ITrashService {
  async getTrashList(): Promise<Trash[]> {
    const {data} = await this.get<Trash[]>('/trash');
    return data;
  }
}

export default TrashService;
