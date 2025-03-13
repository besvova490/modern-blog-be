import { Test, TestingModule } from '@nestjs/testing';
import { BlogPostsController } from './blog-posts.controller';
import { BlogPostsService } from './blog-posts.service';

describe('BlogPostsController', () => {
  let controller: BlogPostsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BlogPostsController],
      providers: [BlogPostsService],
    }).compile();

    controller = module.get<BlogPostsController>(BlogPostsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
