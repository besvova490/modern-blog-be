import { Repository, FindOneOptions, FindManyOptions } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

// entity
import { BlogPost } from 'src/entities/blog-post.entity';

export class BlogPostRepository {
  constructor(
    @InjectRepository(BlogPost)
    private readonly blogPostRepository: Repository<BlogPost>,
  ) {}

  async save(blogPost: BlogPost): Promise<BlogPost> {
    return this.blogPostRepository.save(blogPost);
  }

  async findOne(
    options: FindOneOptions<BlogPost>,
  ): Promise<BlogPost | undefined> {
    return this.blogPostRepository.findOne(options);
  }

  async findMany(options?: FindManyOptions<BlogPost>): Promise<BlogPost[]> {
    return this.blogPostRepository.find(options);
  }
}
