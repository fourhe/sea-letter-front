export type Email = string;

export type User = {
  email: Email;
  receivedThankCount: number;
  sentLetterCount: number;
  sentReplyCount: number;
};

export default interface IUserService {
  updateUserEmail(email: Pick<User, 'email'>): Promise<void>;

  getUser(): Promise<
    Pick<User, 'receivedThankCount' | 'sentLetterCount' | 'sentReplyCount'>
  >;
}
