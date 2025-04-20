import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { AuthService } from './auth.service'
import { UsersModule } from '../users/users.module'
import { JwtStrategy } from './jwt.strategy'
import { AuthController } from 'src/auth/auth.controller'
import { UsersService } from 'src/users/users.service'
import { PrismaService } from 'src/prisma/prisma.service'
import { BlacklistService } from './blacklist.service'

@Module({
  imports: [
    UsersModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'your_jwt_secret',
      signOptions: { expiresIn: '60m' },
    }),
  ],
  providers: [AuthService, UsersService, JwtStrategy, PrismaService, BlacklistService],
  controllers: [AuthController],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}