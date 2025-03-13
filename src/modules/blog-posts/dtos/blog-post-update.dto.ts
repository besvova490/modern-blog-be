import { PartialType } from '@nestjs/mapped-types';
import { IsEnum, IsOptional } from 'class-validator';

// dtos
import { BlogPostDto } from './blog-post.dto';
import { BlogPostStatus } from 'src/enums/blog-post-status.enum';

export class BlogPostUpdateDto extends PartialType(BlogPostDto) {
  @IsOptional()
  @IsEnum(BlogPostStatus)
  status: BlogPostStatus;
}
