import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1709426468015 implements MigrationInterface {
    name = 'Migration1709426468015'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "work" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "start_time" TIMESTAMP NOT NULL, "end_time" TIMESTAMP, "userId" uuid, CONSTRAINT "PK_1ad2a9dfd058d66c37e6d495222" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "work" ADD CONSTRAINT "FK_b3b68f930f4cb8ad93b656c82d2" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "work" DROP CONSTRAINT "FK_b3b68f930f4cb8ad93b656c82d2"`);
        await queryRunner.query(`DROP TABLE "work"`);
    }

}
