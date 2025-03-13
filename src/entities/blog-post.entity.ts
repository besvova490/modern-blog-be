import {
  Entity,
  Column,
  ManyToOne,
  ManyToMany,
  JoinTable,
  BeforeInsert,
  BeforeUpdate,
  JoinColumn,
  OneToMany,
} from 'typeorm';

// entities
import { AppBaseEntity } from './app-base.entity';
import { User } from './user.entity';
import { BlogPostCategory } from './blog-post-category.entity';
import { Comment } from './comment.entity';

// helpers
import { BlogPostStatus } from '../enums/blog-post-status.enum';
import { generateSlug } from '../lib/generate-slug';

@Entity({ name: 'blog_posts' })
export class BlogPost extends AppBaseEntity {
  @Column({ type: 'varchar', unique: true })
  slug: string;

  @Column({ type: 'varchar' })
  title: string;

  @Column({ type: 'text' })
  content: string;

  @Column({ type: 'varchar' })
  thumbnail: string;

  @Column({ type: 'date', nullable: true })
  postedAt: Date;

  @Column({ type: 'enum', enum: BlogPostStatus, default: BlogPostStatus.DRAFT })
  status: BlogPostStatus;

  @Column({ type: 'bigint' })
  authorId: number;

  @ManyToOne(() => User, (user) => user.blogPosts, { nullable: false })
  @JoinColumn({ name: 'authorId' })
  author: User;

  @ManyToMany(() => BlogPostCategory, (category) => category.blogPosts)
  @JoinTable()
  categories: BlogPostCategory[];

  @BeforeInsert()
  @BeforeUpdate()
  generateSlug() {
    this.slug = generateSlug(this.title);
  }

  @OneToMany(() => Comment, (comment) => comment.blogPost)
  comments: Comment[];
}
