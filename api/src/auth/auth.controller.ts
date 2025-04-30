import { Controller, Post, Body, UseGuards, Headers, HttpStatus, HttpException } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthGuard } from '@nestjs/passport'
import { User } from '../../generated/prisma'
import { BlacklistService } from 'src/auth/blacklist.service'

@Controller('auth')
export class AuthController {
  BlacklistService: any
  constructor(
    private readonly authService: AuthService,
    private readonly blacklistService: BlacklistService
  ) {}

  @Post('signup')
  async signUp(@Body() data: Omit<User, 'id' | 'createdAt' | 'updatedAt'>) {
    return this.authService.signUp(data);
  }

  @Post('signin')
  async signIn(@Body() body: { email: string; password: string }) {
    return this.authService.signIn(body.email, body.password)
  }

  @Post('signout')
  async signout(@Headers('authorization') authHeader: string) {
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new HttpException(
        { message: 'Invalid or missing token' },
        HttpStatus.BAD_REQUEST
      );
    }

    const token = authHeader.split(' ')[1];
    await this.blacklistService.addToBlacklist(token); // حرف اول کوچک

    return { 
      statusCode: HttpStatus.OK,
      message: 'Successfully logged out' 
    };
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('profile')
  async getProfile() {
    return { message: 'This is a protected route' }
  }
}