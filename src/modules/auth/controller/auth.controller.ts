import { Controller, Request, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  // constructor(private readonly) {}
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    return req.user;
  }
}
