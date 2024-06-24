import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1719146793330 implements MigrationInterface {
    name = 'Initial1719146793330'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "password" character varying(256) NOT NULL, "email" character varying(256) NOT NULL, "normalizedEmail" character varying(256) NOT NULL, "role" "public"."user_role_enum" NOT NULL, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "UQ_6a06af0a4aa26b46553fb84cd95" UNIQUE ("normalizedEmail"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tag" ("id" SERIAL NOT NULL, "label" character varying(255) NOT NULL, CONSTRAINT "PK_8e4052373c579afc1471f526760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "meetup" ("id" SERIAL NOT NULL, "name" character varying(256) NOT NULL, "description" text NOT NULL, "time" TIMESTAMP WITH TIME ZONE NOT NULL, "location" character varying(256) NOT NULL, CONSTRAINT "PK_fa3a1f57da6be27f197ebf76b71" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "meetup_tags_tag" ("meetupId" integer NOT NULL, "tagId" integer NOT NULL, CONSTRAINT "PK_04e9392fa2cb687a4f499902e8e" PRIMARY KEY ("meetupId", "tagId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_7cf920a799e70e144fb2c563a7" ON "meetup_tags_tag" ("meetupId") `);
        await queryRunner.query(`CREATE INDEX "IDX_e954339fc1ec35091ec3f5d8af" ON "meetup_tags_tag" ("tagId") `);
        await queryRunner.query(`ALTER TABLE "meetup_tags_tag" ADD CONSTRAINT "FK_7cf920a799e70e144fb2c563a76" FOREIGN KEY ("meetupId") REFERENCES "meetup"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "meetup_tags_tag" ADD CONSTRAINT "FK_e954339fc1ec35091ec3f5d8afc" FOREIGN KEY ("tagId") REFERENCES "tag"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "meetup_tags_tag" DROP CONSTRAINT "FK_e954339fc1ec35091ec3f5d8afc"`);
        await queryRunner.query(`ALTER TABLE "meetup_tags_tag" DROP CONSTRAINT "FK_7cf920a799e70e144fb2c563a76"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e954339fc1ec35091ec3f5d8af"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_7cf920a799e70e144fb2c563a7"`);
        await queryRunner.query(`DROP TABLE "meetup_tags_tag"`);
        await queryRunner.query(`DROP TABLE "meetup"`);
        await queryRunner.query(`DROP TABLE "tag"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
