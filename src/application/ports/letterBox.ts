export type LetterBox = {
  id: number;
  title: string;
  hasNewReply: boolean;
  createdAt: string;
};

export type LetterDetail = {
  title: string;
  content: string;
  createdAt: string;
};

export default interface ILetterBoxService {
  getLetterList(): Promise<LetterBox[]>;

  getLetterDetail(id: number): Promise<LetterDetail>;

  deleteLetter(id: number): Promise<void>;
}
