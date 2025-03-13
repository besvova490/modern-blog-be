import { Test, TestingModule } from '@nestjs/testing';
import { BlogPostCategoriesController } from './blog-post-categories.controller';
import { BlogPostCategoriesService } from './blog-post-categories.service';

describe('BlogPostCategoriesController', () => {
  let controller: BlogPostCategoriesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BlogPostCategoriesController],
      providers: [BlogPostCategoriesService],
    }).compile();

    controller = module.get<BlogPostCategoriesController>(BlogPostCategoriesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
