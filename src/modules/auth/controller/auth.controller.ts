import { Controller, Request, Post, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin } from 'src/modules/admin/model/admin.entity';
import { Repository } from 'typeorm';
import { AuthService } from '../service/auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    // @InjectRepository(Admin)
    // private adminRepository: Repository<Admin>,
    private authService: AuthService,
  ) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('refresh')
  async refresh(@Request() req) {
    const admin = await this.authService.findAdmin(req.user.id);
    return this.authService.login(admin);
  }
}
