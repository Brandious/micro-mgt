import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1711789465909 implements MigrationInterface {
    name = 'Migration1711789465909'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "department" character varying`);
        await queryRunner.query(`ALTER TABLE "users" ADD "location" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "location"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "department"`);
    }

}
