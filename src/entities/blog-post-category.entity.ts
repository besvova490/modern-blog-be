import {
  Entity,
  Column,
  ManyToMany,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';

// entities
import { AppBaseEntity } from './app-base.entity';
import { BlogPost } from './blog-post.entity';

// helpers
import { generateSlug } from '../lib/generate-slug';

@Entity({ name: 'blog_post_categories' })
export class BlogPostCategory extends AppBaseEntity {
  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar', unique: true })
  slug: string;

  @ManyToMany(() => BlogPost, (blogPost) => blogPost.categories)
  blogPosts: BlogPost[];

  @BeforeInsert()
  @BeforeUpdate()
  generateSlug() {
    this.slug = generateSlug(this.name);
  }
}
