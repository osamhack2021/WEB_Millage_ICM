import {Get, Post, Body, Put, Delete, Param, Controller, UsePipes} from '@nestjs/common';
import {Request} from 'express';
import {UserService} from './user.service';
import {UserRO, DefaultRO} from './user.interface';
import {CreateUserDto, UpdateUserDto, LoginUserDto} from './dto';
import {HttpException} from '@nestjs/common/exceptions/http.exception';
import {User} from './user.decorator';
import {ValidationPipe} from '../shared/pipes/validation.pipe';

import {
  ApiBearerAuth, ApiTags,
} from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UsePipes(new ValidationPipe())
  @Post('login')
  async login(@Body('user') loginUserDto : LoginUserDto): Promise<UserRO> {
    console.log(loginUserDto);
    const _user = await this.userService.findOne(loginUserDto);

    const errors = {User: ' not found'};
    if (!_user) throw new HttpException({errors}, 401);

    const {id,username,email,phonenumber,fullname,nickname,unit} = _user;
    const user = {id,username,email,phonenumber,fullname,nickname,unit};
    return {user};
  }

  @UsePipes(new ValidationPipe())
  @Post('register')
  async register(@Body('user') userdata : CreateUserDto): Promise<DefaultRO>{
    const user = await this.userService.create(userdata);

    if(user){
      const errors = {result: '유저 생성에 실패했습니다.'};
      throw new HttpException({errors}, 400);
    } else{
      return {result: 'success'};
    }
  }
}
