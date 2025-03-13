import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class BlogPostCategoryResponseDto {
  @Expose()
  @ApiProperty()
  id: number;

  @Expose()
  @ApiProperty()
  name: string;

  @Expose()
  @ApiProperty()
  slug: string;
}
