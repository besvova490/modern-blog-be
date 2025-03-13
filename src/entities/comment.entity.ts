import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';

// entities
import { AppBaseEntity } from './app-base.entity';
import { BlogPost } from './blog-post.entity';
import { User } from './user.entity';

@Entity({ name: 'comments' })
export class Comment extends AppBaseEntity {
  @Column({ type: 'text' })
  content: string;

  @Column({ type: 'bigint' })
  parentId: number;

  @Column({ type: 'bigint', name: 'blog_post_id', nullable: false })
  blogPostId: number;

  @ManyToOne(() => BlogPost, (blogPost) => blogPost.comments)
  @JoinColumn({ name: 'blog_post_id' })
  blogPost: BlogPost;

  @Column({ type: 'bigint', name: 'author_id', nullable: false })
  authorId: number;

  @ManyToOne(() => User, (user) => user.comments)
  @JoinColumn({ name: 'authorId' })
  author: User;
}
