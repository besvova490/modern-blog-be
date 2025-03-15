import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// modules
import { CommentsModule } from '../comments/comments.module';

// services
import { BlogPostsService } from './blog-posts.service';

// controllers
import { BlogPostsController } from './blog-posts.controller';

// repositories
import { BlogPostRepository } from './repositories/blog-post.repository';

// entities
import { BlogPost } from 'src/entities/blog-post.entity';

// subscribers
import { BlogPostSubscriber } from './subscribers/blog-post.subscriber';

@Module({
  imports: [TypeOrmModule.forFeature([BlogPost]), CommentsModule],
  controllers: [BlogPostsController],
  providers: [BlogPostsService, BlogPostRepository, BlogPostSubscriber],
})
export class BlogPostsModule {}
