import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BlacklistService {
  constructor(private prisma: PrismaService) {}

  async addToBlacklist(token: string): Promise<void> {
    await this.prisma.blacklistedToken.create({
      data: { token },
    });
  }

  async isTokenBlacklisted(token: string): Promise<boolean> {
    const result = await this.prisma.blacklistedToken.findUnique({
      where: { token },
    });
    return !!result;
  }
} 