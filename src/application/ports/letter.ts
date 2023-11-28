export type Letter = {
  id?: number;
  title: string;
  content: string;
  createdAt: string | null;
};

export type LetterForm = {
  title: string;
  content: string;
};

export type LetterReplyForm = {
  id: number;
  title: string;
  content: string;
};

export default interface ILetterService {
  getLetterId(): Promise<number>;

  getLetter(id: number): Promise<Letter>;

  writeLetter(data: LetterForm): Promise<void>;

  sendReply(data: LetterForm): Promise<void>;
}
