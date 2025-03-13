import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class BlogPostCategoryDto {
  @ApiProperty({
    description: 'The name of the blog post category',
    example: 'Technology',
  })
  @IsString()
  @IsNotEmpty()
  name: string;
}
