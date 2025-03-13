import { Module, MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';

// middlewares
import { CurrentUserMiddleware } from './middlewares/current-user/current-user.middleware';

// controllers
import { AppController } from './app.controller';

// helpers
import { DatabaseConfig } from '../config/database';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { BlogPostCategoriesModule } from './modules/blog-post-categories/blog-post-categories.module';
import { BlogPostsModule } from './modules/blog-posts/blog-posts.module';
import { CommentsModule } from './modules/comments/comments.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(DatabaseConfig),
    JwtModule.register({ global: true }),
    AuthModule,
    UsersModule,
    BlogPostCategoriesModule,
    BlogPostsModule,
    CommentsModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CurrentUserMiddleware).forRoutes('*');
  }
}
