import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1713639044105 implements MigrationInterface {
    name = 'Migration1713639044105'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "projects" DROP CONSTRAINT "FK_c660095fed2ca33123b47e0d7e5"`);
        await queryRunner.query(`ALTER TABLE "projects" DROP COLUMN "teamsListId"`);
        await queryRunner.query(`ALTER TABLE "teams" ADD "projectId" uuid`);
        await queryRunner.query(`ALTER TABLE "teams" ADD CONSTRAINT "FK_9f03fd857a6f5401abaa1f1ae71" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "teams" DROP CONSTRAINT "FK_9f03fd857a6f5401abaa1f1ae71"`);
        await queryRunner.query(`ALTER TABLE "teams" DROP COLUMN "projectId"`);
        await queryRunner.query(`ALTER TABLE "projects" ADD "teamsListId" uuid`);
        await queryRunner.query(`ALTER TABLE "projects" ADD CONSTRAINT "FK_c660095fed2ca33123b47e0d7e5" FOREIGN KEY ("teamsListId") REFERENCES "teams"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
