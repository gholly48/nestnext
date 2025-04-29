// src/app.module.ts
import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { JobsModule } from './jobs/jobs.module';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
//import { ProfilesModule } from './profiles/profiles.module';

@Module({
  imports:   [UsersModule, JobsModule, AuthModule, /*ProfilesModule]*/],
  providers: [AuthService, PrismaModule],
})

export class AppModule {}