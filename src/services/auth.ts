import type {IAuthenticationService} from './interface';

import {deleteCookies, getCookieValue} from '@/utils/cookie';
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

  async logOut(): Promise<void> {
    await this.post(
      '/logout',
      {},
      {
        'Refresh-Token': getCookieValue('refresh-token'),
      },
    );
    deleteCookies(['access-token', 'refresh-token']);
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

  async deleteUser(): Promise<void> {
    await this.delete('/member');
  }
}

const authenticationService = new AuthenticationService();

export default authenticationService;
