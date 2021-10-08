import {Get, Post, Body, Req, Controller, Param, UsePipes, Patch} from '@nestjs/common';
import {Request} from 'express';
import {UserService} from './user.service';
import {UserRO} from './user.interface';
import {CreateUserDto, LoginUserDto, UpdateUserDto, UserParams} from './dto';
import {ValidationPipe} from '../shared/pipes/validation.pipe';
import {
  ApiBearerAuth, ApiTags,
} from '@nestjs/swagger';
import {Result, ResultObject} from '../common/common.interface';
import {Roles} from 'src/user_role/user_role.decorator';
import {Role} from 'src/user_role/user_role.interface';

@ApiBearerAuth()
@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('session')
  async getSession(@Req() request : Request) : Promise<UserRO> {
    if (request.session && request.session.user) {
      return {
        result: Result.SUCCESS,
        session: request.session.user,
      };
    } else {
      return {
        result: Result.FAIL,
      };
    }
  }

  @UsePipes(new ValidationPipe())
  @Post('login')
  async login(@Body() userdata : LoginUserDto, @Req() request: Request): Promise<UserRO> {
    const _user = await this.userService.findOne({
      username: userdata.username,
      password: userdata.password,
    });
    if (!_user) {
      return {
        result: Result.FAIL,
      };
    }

    const {id, username, email, phonenumber, fullname, nickname, unit, role} = _user;
    const user = {id, username, email, phonenumber, fullname, nickname, unit, role};
    request.session.user = user;
    return {
      result: Result.SUCCESS,
    };
  }


  @UsePipes(new ValidationPipe())
  @Post('register')
  async register(@Body() userdata : CreateUserDto): Promise<UserRO> {
    try {
      const user = await this.userService.create(userdata);
      return user;
    } catch (err) {
      return {
        result: Result.SUCCESS,
        message: err,
      };
    }
  }

  @Get('logout')
  async logout(@Req() req: Request): Promise<ResultObject> {
    try {
      await new Promise((res, rej) => {
        req.session.destroy((err) => {
          if (err) {
            rej(err);
          }
          res(true);
        });
      });
      return {result: Result.SUCCESS};
    } catch (err) {
      return {
        result: Result.ERROR,
        message: err.message,
      };
    }
  }

  @Patch(':id')
  async update(
    @Param() params: UserParams,
    @Body() dto: UpdateUserDto
  ): Promise<ResultObject> {
    try {
      if (await this.userService.update(params.id, dto)) {
        return {result: Result.SUCCESS};
      }
      return {result: Result.FAIL, message: 'Nothing changed'};
    } catch (err) {
      return {result: Result.ERROR, message: err.message};
    }
  }

  @Get('allNormalUsers')
  @Roles(Role.SUPER_ADMIN)
  async getAll() {
    try {
      return {
        result: Result.SUCCESS,
        
      }
    } catch (err) {
      return {result: Result.ERROR, message: err.message};
    }
  }
}
