import { MigrationInterface, QueryRunner } from "typeorm"

export class FooScript1661446035411 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        console.log('Foo script UP!');
        
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
