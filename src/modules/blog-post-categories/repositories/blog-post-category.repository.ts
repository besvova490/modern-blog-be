import { Repository, FindOneOptions, FindManyOptions } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

// entities
import { BlogPostCategory } from 'src/entities/blog-post-category.entity';

export class BlogPostCategoryRepository {
  constructor(
    @InjectRepository(BlogPostCategory)
    private readonly blogPostCategoryRepository: Repository<BlogPostCategory>,
  ) {}

  async save(blogPostCategory: BlogPostCategory): Promise<BlogPostCategory> {
    return this.blogPostCategoryRepository.save(blogPostCategory);
  }

  async findOne(
    options: FindOneOptions<BlogPostCategory>,
  ): Promise<BlogPostCategory | undefined> {
    return this.blogPostCategoryRepository.findOne(options);
  }

  async findMany(
    options: FindManyOptions<BlogPostCategory>,
  ): Promise<BlogPostCategory[]> {
    return this.blogPostCategoryRepository.find(options);
  }
}
