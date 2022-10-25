import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin } from 'src/modules/admin/model/admin.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Admin)
    private adminRepository: Repository<Admin>,
    private jwtService: JwtService,
  ) {}

  async validateAdmin(login: string, pass: string): Promise<Admin> {
    const admin = await this.adminRepository.findOne({
      where: { login },
    });
    if (admin && (await bcrypt.compare(pass, admin.passwordHash))) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { passwordHash, ...secureAdmin } = admin;
      return secureAdmin;
    }
    return null;
  }

  async login(admin: Admin) {
    const payload = { id: admin.id };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  async findAdmin(id: number) {
    const admin = await this.adminRepository.findOne({ where: { id } });
    return admin;
  }
}
