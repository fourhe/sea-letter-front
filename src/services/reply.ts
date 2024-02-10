import type {IReplyService} from './interface';

import Api from '@lib/axios';
import type {Reply, ReplyDetail} from '@services/interface/reply';

class ReplyService extends Api implements IReplyService {
  async getReplyList(id: number): Promise<Reply[]> {
    const {data} = await this.get<Reply[]>(`/mailbox/letters/${id}/replies`);
    return data;
  }

  async getReplyDetail(
    letterId: number,
    replyId: number,
  ): Promise<ReplyDetail> {
    const {data} = await this.get<ReplyDetail>(
      `/mailbox/letters/${letterId}/replies/${replyId}`,
    );
    return data;
  }

  async deleteReply(replyId: number): Promise<void> {
    await this.post(`/mailbox/letters/${replyId}`);
  }

  async setThanks(id: number): Promise<void> {
    await this.post(`/mailbox/letters/${id}/thanks`);
  }
}

export default ReplyService;
