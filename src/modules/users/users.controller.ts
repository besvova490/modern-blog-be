import { Controller, Get, UseGuards } from '@nestjs/common';
import {
  ApiOperation,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

// services
import { UsersService } from './users.service';

// dtos
import { AuthTokenData } from 'src/dtos/auth-token-data.dto';
import { UserResponseDto } from 'src/dtos/user-response-dto';

// helpers
import { JwtAuthGuard } from 'src/guards/jwt-auth/jwt-auth.guard';
import { Serialize } from 'src/interceptors/serialize/serialize.interceptor';
import { CurrentUser } from 'src/decorators/current-user/current-user.decorator';
import { ENDPOINTS } from 'src/constants/endpoints';

@ApiTags(ENDPOINTS.USERS.ROOT)
@Controller(ENDPOINTS.USERS.ROOT)
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({
    description: 'Get current user',
  })
  @ApiOkResponse({ type: UserResponseDto })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @Serialize(UserResponseDto)
  @Get(ENDPOINTS.USERS.ME)
  async me(@CurrentUser() user: AuthTokenData) {
    return this.usersService.findOne({ where: { id: user.id } });
  }
}
