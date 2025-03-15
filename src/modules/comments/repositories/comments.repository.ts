import { Repository, FindOneOptions, FindManyOptions } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

// entities
import { Comment } from 'src/entities/comment.entity';

export class CommentsRepository {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
  ) {}

  async save(comment: Comment): Promise<Comment> {
    return this.commentRepository.save(comment);
  }

  async findOne(
    options: FindOneOptions<Comment>,
  ): Promise<Comment | undefined> {
    return this.commentRepository.findOne(options);
  }

  async findMany(options?: FindManyOptions<Comment>): Promise<Comment[]> {
    return this.commentRepository.find(options);
  }

  async findByBlogPostId(blogPostId: number): Promise<Comment[]> {
    const query = this.commentRepository
      .createQueryBuilder('comment')
      .leftJoinAndSelect('comment.author', 'author')
      .leftJoinAndMapMany(
        'comment.replies',
        Comment,
        'reply',
        'reply.parentId = comment.id',
      )
      .where('comment.blogPostId = :blogPostId', { blogPostId })
      .andWhere('comment.parentId IS NULL')
      .orderBy('comment.createdAt', 'ASC');

    const comments = await query.getMany();

    return comments;
  }
}
