import { Entity, Column, OneToMany } from 'typeorm';

// entities
import { AppBaseEntity } from './app-base.entity';
import { BlogPost } from './blog-post.entity';
import { Comment } from './comment.entity';

@Entity({ name: 'users' })
export class User extends AppBaseEntity {
  @Column({ type: 'varchar', unique: true })
  email: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar', unique: true })
  username: string;

  @Column({ type: 'varchar', nullable: true })
  avatar: string;

  @Column({ type: 'text', nullable: true })
  bio: string;

  @Column({ type: 'varchar', nullable: true })
  location: string;

  @Column({ type: 'varchar', nullable: true })
  website: string;

  @OneToMany(() => BlogPost, (blogPost) => blogPost.author)
  blogPosts: BlogPost[];

  @OneToMany(() => Comment, (comment) => comment.author)
  comments: Comment[];
}
