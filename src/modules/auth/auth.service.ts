import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

// services
import { UsersService } from '../users/users.service';

// dto
import { SignUpDto } from 'src/dtos/sign-up.dto';
import { SignInDto } from './dtos/sign-in.dto';
import { AuthTokenData } from 'src/dtos/auth-token-data.dto';
// lib
import { passwordToHash } from 'src/lib/password';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async signIn(data: AuthTokenData, expiresIn?: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: data.id,
          email: data.email,
        },
        {
          secret: this.configService.get('ACCESS_TOKEN_SECRET'),
          expiresIn:
            expiresIn ||
            +this.configService.get('ACCESS_TOKEN_EXPIRATION_TIME'),
        },
      ),
      this.jwtService.signAsync(
        {
          sub: data.id,
          email: data.email,
        },
        {
          secret: this.configService.get('REFRESH_TOKEN_SECRET'),
          expiresIn: +this.configService.get('REFRESH_TOKEN_EXPIRATION_TIME'),
        },
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async signUp(signUpDto: SignUpDto) {
    const [hashedPassword] = await passwordToHash(signUpDto.password);

    signUpDto.password = hashedPassword;

    return this.usersService.create(signUpDto);
  }

  async verifyUser(signInDto: SignInDto) {
    const user = await this.usersService.findOneByEmail(signInDto.email);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const [slat, storedPassword] = user.password.split('.');
    const [_, hashedPassword] = await passwordToHash(signInDto.password, slat);

    if (storedPassword !== hashedPassword) {
      throw new NotFoundException('User not found');
    }

    return user;
  }
}
