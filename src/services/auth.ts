import type {IAuthenticationService} from './interface';

import Api from '@lib/axios';
import type {Token} from '@services/interface/auth';

class AuthenticationService extends Api implements IAuthenticationService {
  logInForm(): string {
    return `${this.baseURL}/login/form`;
  }

  async logIn(code: string): Promise<Token> {
    const {headers} = await this.post('/login', {code});
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

const authenticationService = new AuthenticationService();

export default authenticationService;
