import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

// constants
import { ENDPOINTS } from '../constants/endpoints';

interface ICheckIfAuthorized {
  pathname?: string;
  token?: string;
  jwtService: JwtService;
  secret: string;
}

export async function checkIfAuthorized({
  pathname,
  token,
  jwtService,
  secret,
}: ICheckIfAuthorized) {
  if (!token) {
    throw new UnauthorizedException();
  }

  try {
    const payload = await jwtService.verifyAsync(token, {
      secret,
      ignoreExpiration:
        !!pathname && pathname.includes(`/${ENDPOINTS.AUTH.REFRESH_TOKEN}`),
    });

    return payload;
  } catch {
    throw new UnauthorizedException();
  }
}
