import { Test, TestingModule } from '@nestjs/testing';
import { BlogPostCategoriesService } from './blog-post-categories.service';

describe('BlogPostCategoriesService', () => {
  let service: BlogPostCategoriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BlogPostCategoriesService],
    }).compile();

    service = module.get<BlogPostCategoriesService>(BlogPostCategoriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
