export type Email = string;

export type User = {
  email: Email;
  receivedThankCount: number;
  sentLetterCount: number;
  sentReplyCount: number;
  isNewUser: boolean;
};

export type MenuInfo = Pick<
  User,
  'receivedThankCount' | 'sentLetterCount' | 'sentReplyCount' | 'isNewUser'
>;

export default interface IUserService {
  updateUserEmail(email: Pick<User, 'email'>): Promise<void>;

  getUser(): Promise<MenuInfo>;
}
