export type Email = string;

export type User = {
  email: Email;
};

export default interface IUserService {
  updateUserEmail(email: Pick<User, 'email'>): Promise<void>;
}
