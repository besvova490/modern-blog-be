import {
  EventSubscriber,
  EntitySubscriberInterface,
  UpdateEvent,
  DataSource,
} from 'typeorm';

// entities
import { BlogPost } from 'src/entities/blog-post.entity';

// enums
import { BlogPostStatus } from 'src/enums/blog-post-status.enum';

@EventSubscriber()
export class BlogPostSubscriber implements EntitySubscriberInterface<BlogPost> {
  constructor(private readonly dataSource: DataSource) {
    dataSource.subscribers.push(this);
  }

  listenTo() {
    return BlogPost;
  }

  beforeUpdate(event: UpdateEvent<BlogPost>) {
    if (
      event.databaseEntity.status === BlogPostStatus.DRAFT &&
      event.entity.status === BlogPostStatus.PUBLISHED
    ) {
      event.entity.postedAt = new Date();
    }
  }
}
