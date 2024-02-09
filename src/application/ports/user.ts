export type Email = string;

export type User = {
  emailAddress: Email | null;
  receivedThankCount: number;
  firstLogin: boolean;
  notificationEnabled: boolean;
  trashCount: number;
};

export type MenuInfo = Pick<
  User,
  | 'receivedThankCount'
  | 'firstLogin'
  | 'notificationEnabled'
  | 'trashCount'
  | 'emailAddress'
>;

export default interface IUserService {
  updateUserEmail(email: Pick<User, 'emailAddress'>): Promise<void>;

  updateUserNotification(
    notification: Pick<User, 'notificationEnabled'>,
  ): Promise<void>;

  getUser(): Promise<MenuInfo>;
}
