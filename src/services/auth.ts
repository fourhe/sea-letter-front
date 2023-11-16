import type {IAuthenticationService} from '@application/ports';
import type {Token} from '@application/ports/auth';
import Api from '@lib/axios';

class AuthenticationService extends Api implements IAuthenticationService {
  logInForm(): string {
    return `${this.baseURL}/login/form`;
  }

  async logIn(code: string): Promise<Token> {
    const {headers} = await this.post(`${this.baseURL}/login`, {code});
    const accessToken = headers['access-token'];
    const refreshToken = headers['refresh-token'];

    if (!accessToken || !refreshToken) throw new Error('No token');
    return {accessToken, refreshToken};
  }

  // eslint-disable-next-line class-methods-use-this
  async logOut(): Promise<void> {
    await fetch('/api/auth/logout');
  }

  async reissueToken(
    refreshToken: string,
    accessToken: string,
  ): Promise<Token> {
    const {headers} = await this.get(
      `${this.baseURL}/reissue/access-token`,
      {},
      undefined,
      {
        'Access-Token': accessToken,
        'Refresh-Token': refreshToken,
      },
    );
    const newAccessToken = headers['access-token'];
    const newRefreshToken = headers['refresh-token'];

    if (!accessToken || !refreshToken) throw new Error('No token');
    return {accessToken: newAccessToken, refreshToken: newRefreshToken};
  }
}

export default AuthenticationService;
