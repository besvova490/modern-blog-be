import { Injectable } from '@nestjs/common';

// repositories
import { BlogPostCategoryRepository } from './repositories/blog-post-category.repository';

// entities
import { BlogPostCategory } from 'src/entities/blog-post-category.entity';

// dtos
import { BlogPostCategoryDto } from './dtos/blog-post-category.dto';

@Injectable()
export class BlogPostCategoriesService {
  constructor(
    private readonly blogPostCategoryRepository: BlogPostCategoryRepository,
  ) {}

  async findAll() {
    return this.blogPostCategoryRepository.findMany({
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async create(createBlogPostCategoryDto: BlogPostCategoryDto) {
    const blogPostCategory = new BlogPostCategory();
    blogPostCategory.name = createBlogPostCategoryDto.name;

    return this.blogPostCategoryRepository.save(blogPostCategory);
  }
}
