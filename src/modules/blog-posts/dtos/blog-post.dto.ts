import { IsString, IsNotEmpty, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class BlogPostDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The title of the blog post',
    example: 'My first blog post',
  })
  title: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The content of the blog post',
    example: 'This is the content of my first blog post',
  })
  content: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The thumbnail of the blog post',
    example: 'https://example.com/thumbnail.jpg',
  })
  thumbnail: string;

  @IsArray()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The categories of the blog post',
    example: [1, 2],
  })
  categories: number[];
}
