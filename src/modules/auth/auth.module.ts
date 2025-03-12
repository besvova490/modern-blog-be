import { Module } from '@nestjs/common';

// modules
import { UsersModule } from '../users/users.module';

// services
import { AuthService } from './auth.service';

// controllers
import { AuthController } from './auth.controller';

@Module({
  imports: [UsersModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
