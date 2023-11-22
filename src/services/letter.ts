import type {ILetterService} from '@application/ports';
import type {
  Letter,
  LetterForm,
  LetterReplyForm,
} from '@application/ports/letter';
import Api from '@lib/axios';

export default class LetterService extends Api implements ILetterService {
  async getLetterId(): Promise<number> {
    const {data} = await this.get<Pick<Letter, 'id'>>(`${this.baseURL}/letter`);
    return data.id;
  }

  async getLetter(id: number): Promise<Letter> {
    const {data} = await this.get<Letter>(`/letter/${id}`);
    return data;
  }

  async writeLetter(data: LetterForm): Promise<void> {
    await this.post('/letter', data);
  }

  async sendReply(data: LetterReplyForm): Promise<void> {
    await this.post(`/letter/${data.id}/reply`, data);
  }
}
