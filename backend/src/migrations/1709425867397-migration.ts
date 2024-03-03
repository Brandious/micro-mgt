import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1709425867397 implements MigrationInterface {
    name = 'Migration1709425867397'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Work" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "start_time" TIMESTAMP NOT NULL, "end_time" TIMESTAMP, "userId" uuid, CONSTRAINT "PK_6da76e83f62b4344f0e9dfb6233" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "Work" ADD CONSTRAINT "FK_40a9f7a57cd6561e2763f4625bb" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Work" DROP CONSTRAINT "FK_40a9f7a57cd6561e2763f4625bb"`);
        await queryRunner.query(`DROP TABLE "Work"`);
    }

}
