import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import { ServiceError } from '../exceptions/service.error';
import { UserError } from '../exceptions/enums/user-error.enum';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOneByNormalizedEmail(email: string): Promise<User | null> {
    return this.userRepository.findOneBy({ normalizedEmail: email });
  }

  async findOneByNormalizedEmailOrFail(email: string): Promise<User> {
    const user = await this.userRepository.findOneBy({
      normalizedEmail: email,
    });

    if (!user) {
      throw new ServiceError(UserError.USER_NOT_FOUND);
    }

    return user;
  }

  async createUser(
    createUserProps: Pick<
      User,
      'email' | 'normalizedEmail' | 'password' | 'role' | 'token'
    >,
  ) {
    return this.userRepository.save(createUserProps);
  }

  async update(id: number, user: Partial<User>) {
    return this.userRepository.save({ id, ...user });
  }

  async findOneByToken(token: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { token } });
  }
}
