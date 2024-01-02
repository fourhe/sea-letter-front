export type Reply = {
  id: number;
  title: string;
  hasNewReply: boolean;
  createdAt: string;
};

export type ReplyDetail = {
  content: string;
} & Reply;

export default interface IReplyService {
  getReplyList(id: number): Promise<Reply[]>;

  getReplyDetail(letterId: number, replyId: number): Promise<ReplyDetail>;

  deleteReply(replyId: number): Promise<void>;
}
