import type {ILetterBoxService, PageQueryString} from './interface';

import Api from '@lib/axios';
import type {LetterBoxList, LetterDetail} from '@services/interface/letterBox';

class LetterBoxService extends Api implements ILetterBoxService {
  async getLetterList(page: PageQueryString): Promise<LetterBoxList> {
    const {data} = await this.get<LetterBoxList, PageQueryString>(
      '/mailbox/letters',
      page,
    );
    return data;
  }

  async getLetterDetail(id: number): Promise<LetterDetail> {
    const {data} = await this.get<LetterDetail>(`/mailbox/letters/${id}`);
    return data;
  }

  async deleteLetter(id: number): Promise<void> {
    await this.post(`/mailbox/letters/${id}`);
  }
}

const repository = new LetterBoxService();

export default repository;
