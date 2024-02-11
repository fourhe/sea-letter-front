import type {IUserService} from './interface';

import Api from '@lib/axios';
import type {MenuInfo, User} from '@services/interface/user';

class UserService extends Api implements IUserService {
  async updateUserEmail(email: Pick<User, 'emailAddress'>) {
    const {data} = await this.put<void, Pick<User, 'emailAddress'>>(
      '/member',
      email,
    );
    return data;
  }

  async updateUserNotification(
    notification: Pick<User, 'notificationEnabled'>,
  ) {
    const {data} = await this.put<void, Pick<User, 'notificationEnabled'>>(
      '/member',
      notification,
    );
    return data;
  }

  async getUser() {
    const {data} = await this.get<MenuInfo>('/menu/info');
    return data;
  }
}

const repository = new UserService();

export default repository;
