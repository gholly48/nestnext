// src/users/users.controller.ts
import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from '../../generated/prisma';

@Controller('users')
export class UsersController {
  profilesService: any;
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() data: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User> {
    return this.usersService.create(data);
  }

  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<User | null> {
    return this.usersService.findOne(id);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() data: Partial<User>): Promise<User | null> {
    return this.usersService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.usersService.remove(id);
  }
  
  @Get('/profile/:userId')
  async getProfileUser(@Param('userId', ParseIntPipe) userId: number) {
    return this.usersService.findProfilesUser(userId);
  }
} 