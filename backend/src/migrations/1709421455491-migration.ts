import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1709421455491 implements MigrationInterface {
    name = 'Migration1709421455491'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "teams" ADD CONSTRAINT "UQ_48c0c32e6247a2de155baeaf980" UNIQUE ("name")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "teams" DROP CONSTRAINT "UQ_48c0c32e6247a2de155baeaf980"`);
    }

}
