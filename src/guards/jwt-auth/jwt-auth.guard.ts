import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

// helpers
import { IS_PUBLIC } from '../../constants/common';
import { extractTokenFromHeader } from '../../lib/extract-token-from-header';
import { checkIfAuthorized } from '../../lib/check-if-authorized';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
    private configService: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = extractTokenFromHeader(request);

    const payload = await checkIfAuthorized({
      pathname: request.route.path,
      token,
      jwtService: this.jwtService,
      secret: this.configService.get('ACCESS_TOKEN_SECRET'),
    });

    request['token'] = payload;

    return true;
  }
}
