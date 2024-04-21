import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1713613197423 implements MigrationInterface {
    name = 'Migration1713613197423'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "projects" ADD "finished" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "projects" DROP COLUMN "finished"`);
    }

}
