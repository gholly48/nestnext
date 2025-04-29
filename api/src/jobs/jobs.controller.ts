import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe } from '@nestjs/common'
import { JobsService } from './jobs.service'
import { Job } from './job.entity'

@Controller('jobs')
export class JobsController {
      constructor(private readonly jobsService: JobsService) {}

@Post()
  create(@Body() data: Omit<Job, 'id' | 'createdAt' | 'updatedAt'>): Promise<Job> {
    return this.jobsService.create(data);
  }     
  
@Get()
    findAll(): Promise<Job[]> {
      return this.jobsService.findAll();
    }
    
@Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Job | null> {
    return this.jobsService.findOne(id);
  } 

@Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() data: Partial<Job>): Promise<Job | null> {
    return this.jobsService.update(id, data);
  }

@Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<Job | null> {
    return this.jobsService.remove(id);
  }
 
  // jobs.controller.ts
@Get('/user/:userId')
async getJobsByUser(@Param('userId', ParseIntPipe) userId: number) {
  return this.jobsService.findJobsByUser(userId);
}
}