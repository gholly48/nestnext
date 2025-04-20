import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProfilesService {
    constructor( private readonly prisma: PrismaService) {}
    
    async findProfilesUser(authorId: number) {
        return this.prisma.profile.findUnique({
          where: { userId: authorId }
        });
      }
}
