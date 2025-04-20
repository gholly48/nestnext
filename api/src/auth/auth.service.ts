import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { UsersService } from '../users/users.service'
import { User } from '@prisma/client'
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(data: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User> {
    return this.usersService.create(data)
  }

  async signIn(email: string, password: string): Promise<{ access_token: string }> {
    const user = await this.usersService.findByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials')
    }
    const payload = { sub: user.id, email: user.email, role: user.role }
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async validateUser(userId: number): Promise<User | null> {
    return this.usersService.findById(userId)
  }
}