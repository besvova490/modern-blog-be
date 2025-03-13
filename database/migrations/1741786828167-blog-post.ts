import { MigrationInterface, QueryRunner } from "typeorm";

export class BlogPost1741786828167 implements MigrationInterface {
    name = 'BlogPost1741786828167'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "blog_post_categories" ("id" BIGSERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "slug" character varying NOT NULL, CONSTRAINT "UQ_5604d8ae074d6f8d3d5dce13f9f" UNIQUE ("slug"), CONSTRAINT "PK_8603d6af8c9a661f37aa085a627" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."blog_posts_status_enum" AS ENUM('draft', 'published', 'archived')`);
        await queryRunner.query(`CREATE TABLE "blog_posts" ("id" BIGSERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "slug" character varying NOT NULL, "title" character varying NOT NULL, "content" text NOT NULL, "thumbnail" character varying NOT NULL, "postedAt" date, "status" "public"."blog_posts_status_enum" NOT NULL DEFAULT 'draft', "authorId" bigint NOT NULL, CONSTRAINT "UQ_5b2818a2c45c3edb9991b1c7a51" UNIQUE ("slug"), CONSTRAINT "PK_dd2add25eac93daefc93da9d387" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "blog_posts_categories_blog_post_categories" ("blogPostsId" bigint NOT NULL, "blogPostCategoriesId" bigint NOT NULL, CONSTRAINT "PK_93eb6aa57646c0bddd412d56d8d" PRIMARY KEY ("blogPostsId", "blogPostCategoriesId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_8d23f992db1d685690f32c400c" ON "blog_posts_categories_blog_post_categories" ("blogPostsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_83fe01e1a56f281da55776d3d7" ON "blog_posts_categories_blog_post_categories" ("blogPostCategoriesId") `);
        await queryRunner.query(`ALTER TABLE "blog_posts" ADD CONSTRAINT "FK_09269227c7acf3cdf47ea4051e1" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "blog_posts_categories_blog_post_categories" ADD CONSTRAINT "FK_8d23f992db1d685690f32c400cd" FOREIGN KEY ("blogPostsId") REFERENCES "blog_posts"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "blog_posts_categories_blog_post_categories" ADD CONSTRAINT "FK_83fe01e1a56f281da55776d3d72" FOREIGN KEY ("blogPostCategoriesId") REFERENCES "blog_post_categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "blog_posts_categories_blog_post_categories" DROP CONSTRAINT "FK_83fe01e1a56f281da55776d3d72"`);
        await queryRunner.query(`ALTER TABLE "blog_posts_categories_blog_post_categories" DROP CONSTRAINT "FK_8d23f992db1d685690f32c400cd"`);
        await queryRunner.query(`ALTER TABLE "blog_posts" DROP CONSTRAINT "FK_09269227c7acf3cdf47ea4051e1"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_83fe01e1a56f281da55776d3d7"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_8d23f992db1d685690f32c400c"`);
        await queryRunner.query(`DROP TABLE "blog_posts_categories_blog_post_categories"`);
        await queryRunner.query(`DROP TABLE "blog_posts"`);
        await queryRunner.query(`DROP TYPE "public"."blog_posts_status_enum"`);
        await queryRunner.query(`DROP TABLE "blog_post_categories"`);
    }

}
