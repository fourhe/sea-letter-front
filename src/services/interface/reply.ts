export type Reply = {
  id: number;
  title: string;
  thanked: boolean;
  createdAt: string;
  read: boolean;
};

export type ReplyDetail = {
  content: string;
} & Reply;

interface IReplyService {
  getReplyList(id: number): Promise<Reply[]>;

  getReplyDetail(letterId: number, replyId: number): Promise<ReplyDetail>;

  deleteReply(replyId: number): Promise<void>;

  setThanks(id: number): Promise<void>;
}

export default IReplyService;
