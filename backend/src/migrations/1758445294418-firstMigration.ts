import { MigrationInterface, QueryRunner } from 'typeorm';

export class FirstMigration1758445294418 implements MigrationInterface {
  name = 'FirstMigration1758445294418';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TYPE "public"."staff_role_enum" AS ENUM('admin', 'staff')`);
    await queryRunner.query(
      `CREATE TABLE "staff" ("id" SERIAL NOT NULL, "name" character varying(96) NOT NULL, "phone" character varying(96) NOT NULL, "role" "public"."staff_role_enum" NOT NULL DEFAULT 'staff', "otp" integer, "otp_expire" bigint, CONSTRAINT "UQ_4d4956f0d921cf205e2c34e130b" UNIQUE ("phone"), CONSTRAINT "PK_e4ee98bb552756c180aec1e854a" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."plan_name_enum" AS ENUM('Monthly', 'Yearly', 'Quarterly')`,
    );
    await queryRunner.query(
      `CREATE TABLE "plan" ("id" SERIAL NOT NULL, "name" "public"."plan_name_enum" NOT NULL, "amount" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_54a2b686aed3b637654bf7ddbb3" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "member" ("id" SERIAL NOT NULL, "name" character varying(200) NOT NULL, "email" character varying, "phone" character varying NOT NULL, "address" character varying, "image" character varying, "planId" integer NOT NULL, "startDate" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "endDate" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_4678079964ab375b2b31849456c" UNIQUE ("email"), CONSTRAINT "PK_97cbbe986ce9d14ca5894fdc072" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "membership" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "memberId" integer, CONSTRAINT "PK_83c1afebef3059472e7c37e8de8" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user_plan" ("id" SERIAL NOT NULL, "memberId" integer NOT NULL, "planId" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_aa22a94c276c9921fe6590c1557" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "amount" ("id" SERIAL NOT NULL, "amount" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a477ff5de83a86ac715bb5ddac9" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "member" ADD CONSTRAINT "FK_3bf78860a2bea7cb52c60078b89" FOREIGN KEY ("planId") REFERENCES "plan"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "membership" ADD CONSTRAINT "FK_3b4b41597707b13086e71727422" FOREIGN KEY ("memberId") REFERENCES "member"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_plan" ADD CONSTRAINT "FK_4fef538ce9f36b8b88b66de22c9" FOREIGN KEY ("memberId") REFERENCES "member"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_plan" ADD CONSTRAINT "FK_5597b722330db8ad8f76664a075" FOREIGN KEY ("planId") REFERENCES "plan"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_plan" DROP CONSTRAINT "FK_5597b722330db8ad8f76664a075"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_plan" DROP CONSTRAINT "FK_4fef538ce9f36b8b88b66de22c9"`,
    );
    await queryRunner.query(
      `ALTER TABLE "membership" DROP CONSTRAINT "FK_3b4b41597707b13086e71727422"`,
    );
    await queryRunner.query(
      `ALTER TABLE "member" DROP CONSTRAINT "FK_3bf78860a2bea7cb52c60078b89"`,
    );
    await queryRunner.query(`DROP TABLE "amount"`);
    await queryRunner.query(`DROP TABLE "user_plan"`);
    await queryRunner.query(`DROP TABLE "membership"`);
    await queryRunner.query(`DROP TABLE "member"`);
    await queryRunner.query(`DROP TABLE "plan"`);
    await queryRunner.query(`DROP TYPE "public"."plan_name_enum"`);
    await queryRunner.query(`DROP TABLE "staff"`);
    await queryRunner.query(`DROP TYPE "public"."staff_role_enum"`);
  }
}
