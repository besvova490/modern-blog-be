import { Injectable } from '@nestjs/common';

// repositories
import { CommentsRepository } from './repositories/comments.repository';

// entities
import { Comment } from 'src/entities/comment.entity';

// dtos
import { CommentDto } from 'src/dtos/comment.dto';

@Injectable()
export class CommentsService {
  constructor(private readonly commentsRepository: CommentsRepository) {}

  async findByAuthorId(authorId: number) {
    return this.commentsRepository.findMany({ where: { authorId } });
  }

  async create(commentDto: CommentDto, authorId: number, blogPostId: number) {
    const comment = new Comment();
    comment.content = commentDto.content;
    comment.authorId = authorId;
    comment.blogPostId = blogPostId;
    comment.parentId = commentDto.parentId;

    return this.commentsRepository.save(comment);
  }

  async findByBlogPostId(blogPostId: number) {
    return this.commentsRepository.findByBlogPostId(blogPostId);
  }
}
