import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { BaseEntity } from './base.entity';
import { Prisma } from '@prisma/client';

@Injectable()
export abstract class BaseService<
  T extends BaseEntity,
  K extends keyof PrismaService
> {
  constructor(
    protected readonly prisma: PrismaService,
    private readonly model: K,
  ) {}

  // Create
  async create(data: Omit<T, 'id' | 'createdAt' | 'updatedAt'>): Promise<T> {
    try {
      return (this.prisma[this.model] as any).create({ data }) as Promise<T>
    } catch (error) {
      throw new Error(`Error creating ${String(this.model)}: ${error.message}`)
    }
  }

  // Find One by ID
  async findOne(id: number): Promise<T | null> {
    try {
    return (this.prisma[this.model] as any).findUnique({ where: { id } }) as Promise<T | null>;
    } catch (error) {
      throw new Error(`Error creating ${String(this.model)}: ${error.message}`)  
    }
  }

  // Find All (با پاگینیشن)
  async findAll(
    options?: {
      skip?: number;
      take?: number;
      where?: Prisma.Args<T, 'findMany'>['where'];
    },
  ): Promise<T[]> {
    return (this.prisma[this.model] as any).findMany({
      skip: options?.skip,
      take: options?.take,
      where: options?.where,
    }) as Promise<T[]>;
  }
 
  // Update
  async update(
    id: number,
    data: Partial<Omit<T, 'id' | 'createdAt' | 'updatedAt'>>,
  ): Promise<T> {
    return (this.prisma[this.model] as any).update({
      where: { id },
      data: { ...data, updatedAt: new Date() },
    }) as Promise<T>;
  }

  // Delete
  async remove(id: number): Promise<T> {
    try {
    return (this.prisma[this.model] as any).delete({ where: { id } }) as Promise<T>;
    } catch (error) {
          throw new Error(`Error creating ${String(this.model)}: ${error.message}`)  
  
    }
  }

  // رابطه‌ها (اختیاری)
  async findWithRelations(options: {
    where?: Prisma.Args<T, 'findMany'>['where'];
    include?: Prisma.Args<T, 'findMany'>['include'];
  }): Promise<T[]> {
    return (this.prisma[this.model] as any).findMany({
      where: options.where,
      include: options.include,
    }) as Promise<T[]>;
  }
}