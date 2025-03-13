import { Injectable, NotFoundException } from '@nestjs/common';

// repositories
import { BlogPostRepository } from './repositories/blog-post.repository';

// entities
import { BlogPost } from 'src/entities/blog-post.entity';
import { BlogPostCategory } from 'src/entities/blog-post-category.entity';

// dtos
import { BlogPostDto } from './dtos/blog-post.dto';
import { BlogPostUpdateDto } from './dtos/blog-post-update.dto';
@Injectable()
export class BlogPostsService {
  constructor(private readonly blogPostRepository: BlogPostRepository) {}

  async create(blogPostDto: BlogPostDto, authorId: number): Promise<BlogPost> {
    const blogPost = new BlogPost();
    blogPost.title = blogPostDto.title;
    blogPost.content = blogPostDto.content;
    blogPost.thumbnail = blogPostDto.thumbnail;
    blogPost.authorId = authorId;
    blogPost.categories = blogPostDto.categories.map(
      (id) => ({ id }) as BlogPostCategory,
    );

    return this.blogPostRepository.save(blogPost);
  }

  async findAll(): Promise<BlogPost[]> {
    return this.blogPostRepository.findMany({
      relations: ['categories', 'author'],
    });
  }

  async findBySlug(slug: string): Promise<BlogPost> {
    const post = await this.blogPostRepository.findOne({
      where: { slug },
      relations: ['categories', 'author'],
    });

    if (!post) {
      throw new NotFoundException('Blog post not found');
    }

    return post;
  }

  async update(slug: string, blogPostDto: BlogPostUpdateDto, userId: number) {
    const post = await this.blogPostRepository.findOne({
      where: { slug },
      relations: ['author'],
    });

    if (!post || post.authorId !== userId) {
      throw new NotFoundException('Blog post not found');
    }

    Object.assign(post, blogPostDto);

    if (blogPostDto.categories) {
      post.categories = blogPostDto.categories.map(
        (id) => ({ id }) as BlogPostCategory,
      );
    }

    return this.blogPostRepository.save(post);
  }
}
