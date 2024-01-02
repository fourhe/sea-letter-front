import type {ILetterBoxService} from '@application/ports';
import type {LetterBox, LetterDetail} from '@application/ports/letterBox';
import Api from '@lib/axios';

class LetterBoxService extends Api implements ILetterBoxService {
  async getLetterList(): Promise<LetterBox[]> {
    const {data} = await this.get<LetterBox[]>('/mailbox/letters');
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

export default LetterBoxService;
