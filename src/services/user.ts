import type {IUserService} from '@application/ports';
import type {MenuInfo, User} from '@application/ports/user';
import Api from '@lib/axios';

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

export default UserService;
