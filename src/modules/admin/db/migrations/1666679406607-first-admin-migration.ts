import { MigrationInterface, QueryRunner, Repository, Table } from 'typeorm';
import { Admin } from '../../model/admin.entity';
import * as bcrypt from 'bcrypt';

export class firstAdminMigration1666679406607 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const adminRepository: Repository<Admin> =
      queryRunner.connection.getRepository(Admin);

    // if (await adminRepository.findOne({ where: { login: 'admin' } })) {
    //   return;
    // }
    const admin: any = adminRepository.create({
      login: 'admin',
      passwordHash: await bcrypt.hash('secret', 9),
      nickName: 'Slav',
    });

    // await adminRepository.insert(admin);
    await queryRunner.createTable(
      new Table({
        name: 'question',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
          },
          {
            name: 'name',
            type: 'varchar',
          },
        ],
      }),
      true,
    );

    await queryRunner;
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    //   const adminRepository: Repository<Admin> =
    //     queryRunner.connection.getRepository(Admin);
    //   const admin = await adminRepository.findOne({ where: { login: 'admin' } });
    //   if (!admin) {
    //     return;
    //   }
    //   await adminRepository.remove(admin);
    // }
  }
}
