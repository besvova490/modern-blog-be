import { Controller, Post, Body } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBody,
  ApiOkResponse,
  ApiForbiddenResponse,
} from '@nestjs/swagger';

// services
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';

// helpers
import { ENDPOINTS } from 'src/constants/endpoints';

// dto
import { SignUpDto } from 'src/dtos/sign-up.dto';
import { SignInDto } from './dtos/sign-in.dto';
import { UserResponseDto } from 'src/dtos/user-response-dto';

@ApiTags(ENDPOINTS.AUTH.ROOT)
@Controller(ENDPOINTS.AUTH.ROOT)
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Post(ENDPOINTS.AUTH.SIGN_UP)
  async signUp(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto);
  }

  @ApiOperation({
    description: 'Sign in with email and password',
  })
  @ApiBody({
    type: SignInDto,
  })
  @ApiOkResponse({ type: UserResponseDto })
  @ApiForbiddenResponse({ description: 'Credentials are incorrect' })
  @Post(ENDPOINTS.AUTH.SIGN_IN)
  async signIn(@Body() signInDto: SignInDto) {
    const user = await this.authService.verifyUser(signInDto);

    return this.authService.signIn({ id: user.id, email: user.email });
  }
}
