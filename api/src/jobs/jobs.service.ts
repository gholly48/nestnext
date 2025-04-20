import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { BaseService } from '../common/base.service';
import { Job } from '@prisma/client';

 
@Injectable()
export class JobsService extends BaseService<Job, 'job'> {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma, 'job');
  }

  async findJobsByUser(authorId: number) {
    return this.prisma.job.findMany({
      where: { authorId }
    });
  }
  
}