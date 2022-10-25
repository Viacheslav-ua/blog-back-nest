import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { Admin } from 'src/modules/admin/model/admin.entity';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'login',
    });
  }

  async validate(login: string, password: string): Promise<Admin> {
    const admin = await this.authService.validateAdmin(login, password);
    if (!admin) {
      throw new UnauthorizedException();
    }

    return admin;
  }
}
