import { MigrationInterface, QueryRunner } from "typeorm";

export class default1678635611715 implements MigrationInterface {
    name = 'default1678635611715'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`games\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` text NOT NULL, \`developer\` text NOT NULL, \`year\` float NOT NULL, \`price\` float NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`games\``);
    }

}
