import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1709424535763 implements MigrationInterface {
    name = 'Migration1709424535763'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "projects" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" character varying NOT NULL, "teamId" character varying, "teamsListId" uuid, CONSTRAINT "UQ_2187088ab5ef2a918473cb99007" UNIQUE ("name"), CONSTRAINT "PK_6271df0a7aed1d6c0691ce6ac50" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "projects" ADD CONSTRAINT "FK_c660095fed2ca33123b47e0d7e5" FOREIGN KEY ("teamsListId") REFERENCES "teams"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "projects" DROP CONSTRAINT "FK_c660095fed2ca33123b47e0d7e5"`);
        await queryRunner.query(`DROP TABLE "projects"`);
    }

}
