import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { User } from './user.entity'
import * as bcrypt  from 'bcryptjs'

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User> {
  const hashedPassword = bcrypt.hashSync(data.password, 10); // همگام (Sync)

  return this.prisma.user.create({
    data: {
      ...data,
      password: hashedPassword // جایگزینی با پسورد هش‌شده
    }
  });
}

  async findAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async findOne(id: number): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async update(id: number, data: Partial<User>): Promise<User | null> {
    return this.prisma.user.update({
      where: { id },
      data: { ...data, updatedAt: new Date() },
    });
  }

  async remove(id: number): Promise<boolean> {
    await this.prisma.user.delete({ where: { id } });
    return true;
  }
}