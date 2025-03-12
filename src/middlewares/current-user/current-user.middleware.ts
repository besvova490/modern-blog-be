import { Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

// services
import { UsersService } from '../../modules/users/users.service';

// helpers
import { extractTokenFromHeader } from '../../lib/extract-token-from-header';

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
  ) {}

  async use(req: any, res: any, next: () => void) {
    try {
      const token = extractTokenFromHeader(req);

      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get('ACCESS_TOKEN_SECRET'),
      });

      req.user = payload;

      next();
    } catch {
      next();
    }
  }
}
