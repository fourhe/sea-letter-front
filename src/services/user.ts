import type {IUserService} from '@application/ports';
import type {User} from '@application/ports/user';
import Api from '@lib/axios';

class UserService extends Api implements IUserService {
  async updateUserEmail(email: User): Promise<void> {
    const {data} = await this.put<void, Pick<User, 'email'>>('/member', email);
    return data;
  }
}

export default UserService;
