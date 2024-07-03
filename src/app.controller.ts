import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUserDto } from './dto/get-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { Roles } from './decorators/roles.decorator';
import { Role } from './entity/role.enum';

@Controller("user")
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    return await this.appService.createUser(createUserDto);
  }

  @Post("/login")
  async loginUser(@Body() loginUserDto: LoginUserDto) {
    return await this.appService.loginUser(loginUserDto);
  }

  @Get()
  @Roles([Role.ADMIN])
  async getUserByFilters(@Body() getUserDto: GetUserDto) {
    return await this.appService.getUserByFilters(getUserDto);
  }

  @Put(":id")
  async updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.appService.updateUser(id, updateUserDto);
  }

  @Delete(":id")
  async deleteUser(@Param('id') id: string) {
    return this.appService.deleteUser(id);
  }

}
