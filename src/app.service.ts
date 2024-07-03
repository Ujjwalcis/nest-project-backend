import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { ClientProxy } from '@nestjs/microservices';
import { GetUserDto } from './dto/get-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UserVerifyDto } from './dto/userVerify.dto';

@Injectable()
export class AppService {

  constructor(
    @Inject("USERCRUD") private readonly userCrudClient: ClientProxy,
  ) { }

  getHello(): string {
    return 'Hello World!';
  }

  async createUser(createUserDto: CreateUserDto) {
    return this.userCrudClient.send('createUser', createUserDto);
  }

  async loginUser(loginUserDto: LoginUserDto) {
    return this.userCrudClient.send('loginUser', { loginUserDto: loginUserDto, key: process.env.JWT_KEY });
  }

  async getUserByFilters(getUserDto: GetUserDto) {
    return this.userCrudClient.send('getUserByFilters', getUserDto);
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto) {
    return this.userCrudClient.send('updateUser', { id, updateUserDto });
  }

  async deleteUser(id: string) {
    return this.userCrudClient.send('deleteUser', id);
  }
}
