import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// services
import { CommentsService } from './comments.service';

// controllers
import { CommentsController } from './comments.controller';

// repositories
import { CommentsRepository } from './repositories/comments.repository';

// entities
import { Comment } from 'src/entities/comment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Comment])],
  controllers: [CommentsController],
  providers: [CommentsService, CommentsRepository],
  exports: [CommentsService],
})
export class CommentsModule {}
