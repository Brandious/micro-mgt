import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1713659668191 implements MigrationInterface {
    name = 'Migration1713659668191'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "projects" DROP COLUMN "teamId"`);
        await queryRunner.query(`ALTER TABLE "teams" ADD "description" character varying DEFAULT 'TEAM description'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "teams" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "projects" ADD "teamId" character varying`);
    }

}
