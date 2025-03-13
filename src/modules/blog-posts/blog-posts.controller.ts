import {
  Controller,
  UseGuards,
  Post,
  Body,
  Get,
  Param,
  Patch,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

// services
import { BlogPostsService } from './blog-posts.service';

// dtos
import { BlogPostUpdateDto } from './dtos/blog-post-update.dto';
import { BlogPostDto } from './dtos/blog-post.dto';
import { BlogPostResponseDto } from './dtos/blog-post-response.dto';

// entities
import { User } from 'src/entities/user.entity';

// helpers
import { ENDPOINTS } from 'src/constants/endpoints';
import { JwtAuthGuard } from 'src/guards/jwt-auth/jwt-auth.guard';
import { IsPublic } from 'src/decorators/is-public/is-public.decorator';
import { Serialize } from 'src/interceptors/serialize/serialize.interceptor';
import { CurrentUser } from 'src/decorators/current-user/current-user.decorator';

@ApiTags('Blog Posts')
@UseGuards(JwtAuthGuard)
@Controller(ENDPOINTS.BLOG_POSTS.ROOT)
export class BlogPostsController {
  constructor(private readonly blogPostsService: BlogPostsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new blog post' })
  @ApiResponse({
    status: 201,
    description: 'The blog post has been successfully created.',
    type: BlogPostResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @Serialize(BlogPostResponseDto)
  async create(@Body() blogPostDto: BlogPostDto, @CurrentUser() user: User) {
    return this.blogPostsService.create(blogPostDto, user.id);
  }

  @Get()
  @ApiOperation({ summary: 'Get all blog posts' })
  @ApiResponse({
    status: 200,
    description: 'The list of blog posts.',
    type: [BlogPostResponseDto],
  })
  @Serialize(BlogPostResponseDto)
  @IsPublic()
  async findAll() {
    return this.blogPostsService.findAll();
  }

  @Get(':slug')
  @ApiOperation({ summary: 'Get a blog post by slug' })
  @ApiResponse({
    status: 200,
    description: 'The blog post has been successfully retrieved.',
    type: BlogPostResponseDto,
  })
  @Serialize(BlogPostResponseDto)
  @IsPublic()
  async findBySlug(@Param('slug') slug: string) {
    return this.blogPostsService.findBySlug(slug);
  }

  @Patch(':slug')
  @ApiOperation({ summary: 'Update a blog post by slug' })
  @ApiResponse({
    status: 200,
    description: 'The blog post has been successfully updated.',
    type: BlogPostResponseDto,
  })
  @Serialize(BlogPostResponseDto)
  async update(
    @Param('slug') slug: string,
    @Body() blogPostDto: BlogPostUpdateDto,
    @CurrentUser() user: User,
  ) {
    return this.blogPostsService.update(slug, blogPostDto, user.id);
  }
}
