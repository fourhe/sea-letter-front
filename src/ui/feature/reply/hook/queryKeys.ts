import {createQueryKeyStore} from '@lukemorales/query-key-factory';

type ReplyKeys = {
  replyList: {
    list: (letterId: number) => [number];
  };
  replyDetail: {
    detail: (letterId: number, replyId: number) => [number, number];
  };
};

export const replyQueryKeys = createQueryKeyStore<ReplyKeys>({
  replyList: {
    list: (letterId: number) => [letterId],
  },
  replyDetail: {
    detail: (letterId: number, replyId: number) => [replyId, letterId],
  },
});
