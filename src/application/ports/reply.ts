export type Reply = {
  id: number;
  title: string;
  hasNewReply: boolean;
  createdAt: string;
};

export type ReplyDetail = {
  title: string;
  content: string;
  createdAt: string;
};

export default interface IReplyService {
  getReplyList(id: number): Promise<Reply[]>;

  getReplyDetail(letterId: number, replyId: number): Promise<ReplyDetail>;
}
