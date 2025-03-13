import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

// services
import { BlogPostCategoriesService } from './blog-post-categories.service';

// constants
import { ENDPOINTS } from 'src/constants/endpoints';

// dtos
import { BlogPostCategoryDto } from './dtos/blog-post-category.dto';
import { BlogPostCategoryResponseDto } from './dtos/blog-post-category-response.dto';

// helpers
import { Serialize } from 'src/interceptors/serialize/serialize.interceptor';
import { IsPublic } from 'src/decorators/is-public/is-public.decorator';
import { JwtAuthGuard } from 'src/guards/jwt-auth/jwt-auth.guard';

@ApiTags('Blog Post Categories')
@UseGuards(JwtAuthGuard)
@Controller(ENDPOINTS.BLOG_POSTS.CATEGORIES)
export class BlogPostCategoriesController {
  constructor(
    private readonly blogPostCategoriesService: BlogPostCategoriesService,
  ) {}

  @Get()
  @IsPublic()
  @ApiOperation({ summary: 'Get all blog post categories' })
  @ApiResponse({
    status: 200,
    description: 'The list of blog post categories',
    type: [BlogPostCategoryResponseDto],
  })
  @Serialize(BlogPostCategoryResponseDto)
  async findAll() {
    return this.blogPostCategoriesService.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'Create a new blog post category' })
  @ApiResponse({
    status: 201,
    description: 'The created blog post category',
    type: BlogPostCategoryResponseDto,
  })
  @Serialize(BlogPostCategoryResponseDto)
  async create(@Body() createBlogPostCategoryDto: BlogPostCategoryDto) {
    return this.blogPostCategoriesService.create(createBlogPostCategoryDto);
  }
}
