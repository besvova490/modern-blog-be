import { Injectable, BadRequestException } from '@nestjs/common';
import { randomBytes } from 'crypto';
import { FindOneOptions } from 'typeorm';

// repositories
import { UserRepository } from './repositories/user.repository';

// entities
import { User } from 'src/entities/user.entity';

// dtos
import { SignUpDto } from 'src/dtos/sign-up.dto';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(data: SignUpDto): Promise<User> {
    let user = await this.userRepository.findOne({
      where: { email: data.email },
    });

    if (user) {
      throw new BadRequestException('User already exists');
    }

    user = new User();

    user.email = data.email;
    user.password = data.password;
    user.name = data.name;
    user.username = `${data.name}-${randomBytes(4).toString('hex')}`;

    return this.userRepository.save(user);
  }

  async findOneByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({
      where: { email },
    });
  }

  async findOne(options: FindOneOptions<User>): Promise<User> {
    return this.userRepository.findOne(options);
  }
}
