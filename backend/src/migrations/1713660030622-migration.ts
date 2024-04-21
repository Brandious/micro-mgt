import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1713660030622 implements MigrationInterface {
    name = 'Migration1713660030622'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "projects" ADD "startDate" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "projects" ADD "expectedFinishingDate" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "projects" ADD "boardID" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "projects" DROP COLUMN "boardID"`);
        await queryRunner.query(`ALTER TABLE "projects" DROP COLUMN "expectedFinishingDate"`);
        await queryRunner.query(`ALTER TABLE "projects" DROP COLUMN "startDate"`);
    }

}
