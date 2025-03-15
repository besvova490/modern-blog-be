import { MigrationInterface, QueryRunner } from "typeorm";

export class CommentsParrent1741882857118 implements MigrationInterface {
    name = 'CommentsParrent1741882857118'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comments" RENAME COLUMN "parentId" TO "parent_id"`);
        await queryRunner.query(`ALTER TABLE "comments" ALTER COLUMN "parent_id" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comments" ALTER COLUMN "parent_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "comments" RENAME COLUMN "parent_id" TO "parentId"`);
    }

}
