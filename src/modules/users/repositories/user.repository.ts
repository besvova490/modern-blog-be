import { Repository, FindOneOptions, FindManyOptions } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

// entities
import { User } from '../../../entities/user.entity';

export class UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async save(user: User): Promise<User> {
    return this.userRepository.save(user);
  }

  async findOne(options: FindOneOptions<User>): Promise<User | undefined> {
    return this.userRepository.findOne(options);
  }

  async findMany(options: FindManyOptions<User>): Promise<User[]> {
    return this.userRepository.find(options);
  }

  async delete(userId: number): Promise<void> {
    await this.userRepository.delete(userId);
  }
}
