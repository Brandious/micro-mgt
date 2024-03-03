import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1709421617463 implements MigrationInterface {
    name = 'Migration1709421617463'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users_teams" ("usersId" uuid NOT NULL, "teamsId" uuid NOT NULL, CONSTRAINT "PK_d70e7014cceb491b2edd4f9d752" PRIMARY KEY ("usersId", "teamsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_0166ecd316aa49c5ead0e7ded8" ON "users_teams" ("usersId") `);
        await queryRunner.query(`CREATE INDEX "IDX_376b5001faa705fa20ecd2ca2c" ON "users_teams" ("teamsId") `);
        await queryRunner.query(`ALTER TABLE "users_teams" ADD CONSTRAINT "FK_0166ecd316aa49c5ead0e7ded83" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "users_teams" ADD CONSTRAINT "FK_376b5001faa705fa20ecd2ca2cc" FOREIGN KEY ("teamsId") REFERENCES "teams"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users_teams" DROP CONSTRAINT "FK_376b5001faa705fa20ecd2ca2cc"`);
        await queryRunner.query(`ALTER TABLE "users_teams" DROP CONSTRAINT "FK_0166ecd316aa49c5ead0e7ded83"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_376b5001faa705fa20ecd2ca2c"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_0166ecd316aa49c5ead0e7ded8"`);
        await queryRunner.query(`DROP TABLE "users_teams"`);
    }

}
