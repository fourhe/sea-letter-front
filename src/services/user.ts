import type {IUserService} from './interface';

import Api from '@lib/axios';
import type {MenuInfo, User, UserNotification} from '@services/interface/user';

class UserService extends Api implements IUserService {
  async updateUserEmail(email: UserNotification) {
    const {data} = await this.put<void, UserNotification>('/member', email);
    return data;
  }

  async updateUserNotification(notification: UserNotification) {
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
