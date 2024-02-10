import type {PageQuery, PageQueryString} from './common';

export type LetterBox = {
  id: number;
  title: string;
  hasNewReply: boolean;
  createdAt: string;
};

export type LetterBoxList = PageQuery<{
  letterListResponses: LetterBox[];
}>;

export type LetterDetail = {
  title: string;
  content: string;
  createdAt: string;
};

export default interface ILetterBoxService {
  getLetterList(page: PageQueryString): Promise<LetterBoxList>;

  getLetterDetail(id: number): Promise<LetterDetail>;

  deleteLetter(id: number): Promise<void>;
}
