type AccessToken = string;
type RefreshToken = string;
export type Token = {accessToken: AccessToken; refreshToken: RefreshToken};

interface IAuthenticationService {
  logInForm(): string;

  logIn(code: string): Promise<Token>;

  logOut(): Promise<void>;

  reissueToken(refreshToken: string, accessToken: string): Promise<Token>;

  deleteUser(): Promise<void>;
}

export default IAuthenticationService;
