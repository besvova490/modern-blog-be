import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// services
import { BlogPostCategoriesService } from './blog-post-categories.service';

// controllers
import { BlogPostCategoriesController } from './blog-post-categories.controller';

// entities
import { BlogPostCategory } from 'src/entities/blog-post-category.entity';

// repositories
import { BlogPostCategoryRepository } from './repositories/blog-post-category.repository';

@Module({
  imports: [TypeOrmModule.forFeature([BlogPostCategory])],
  controllers: [BlogPostCategoriesController],
  providers: [BlogPostCategoriesService, BlogPostCategoryRepository],
})
export class BlogPostCategoriesModule {}
