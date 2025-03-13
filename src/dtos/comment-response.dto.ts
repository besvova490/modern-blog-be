import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

// dtos
import { UserResponseDto } from './user-response-dto';

export class CommentResponseDto {
  @Expose()
  @ApiProperty()
  id: string;

  @Expose()
  @ApiProperty()
  content: string;

  @Expose()
  @ApiProperty()
  createdAt: Date;

  @Expose()
  @ApiProperty()
  author: UserResponseDto;
}
