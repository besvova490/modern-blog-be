import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform, plainToInstance } from 'class-transformer';

// dtos
import { UserResponseDto } from 'src/dtos/user-response-dto';
import { BlogPostCategoryResponseDto } from 'src/modules/blog-post-categories/dtos/blog-post-category-response.dto';
import { BlogPostStatus } from 'src/enums/blog-post-status.enum';

export class BlogPostResponseDto {
  @Expose()
  @ApiProperty()
  id: number;

  @Expose()
  @ApiProperty()
  title: string;

  @Expose()
  @ApiProperty()
  slug: string;

  @Expose()
  @ApiProperty()
  content: string;

  @Expose()
  @ApiProperty()
  thumbnail: string;

  @Expose()
  @ApiProperty()
  postedAt: Date;

  @Expose()
  @ApiProperty()
  status: BlogPostStatus;

  @Expose()
  @ApiProperty({ type: [BlogPostCategoryResponseDto] })
  @Transform(({ obj }) =>
    plainToInstance(BlogPostCategoryResponseDto, obj.categories, {
      excludeExtraneousValues: true,
    }),
  )
  categories: BlogPostCategoryResponseDto[];

  @Expose()
  @ApiProperty()
  @Transform(({ obj }) =>
    plainToInstance(UserResponseDto, obj.author, {
      excludeExtraneousValues: true,
    }),
  )
  author: UserResponseDto;
}
