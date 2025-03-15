import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

// services
import { CommentsService } from './comments.service';

// endpoints
import { ENDPOINTS } from 'src/constants/endpoints';

// dtos
import { AuthTokenData } from 'src/dtos/auth-token-data.dto';

// helpers
import { CurrentUser } from 'src/decorators/current-user/current-user.decorator';
import { JwtAuthGuard } from 'src/guards/jwt-auth/jwt-auth.guard';

@Controller(ENDPOINTS.COMMENTS.ROOT)
@ApiTags(ENDPOINTS.COMMENTS.ROOT)
@UseGuards(JwtAuthGuard)
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get(ENDPOINTS.COMMENTS.MY_COMMENTS)
  async getMyComments(@CurrentUser() user: AuthTokenData) {
    return this.commentsService.findByAuthorId(user.id);
  }
}
