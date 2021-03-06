import {Get, Post, Body, Req, Controller, Param, UsePipes, Patch, Delete, ParseIntPipe} from '@nestjs/common';
import {Request} from 'express';
import {UserService} from './user.service';
import {UserData, UserRO} from './user.interface';
import {CreateUserDto, LoginUserDto, UpdateUserDto} from './dto';
import {ValidationPipe} from '../shared/pipes/validation.pipe';
import {
  ApiBearerAuth, ApiTags,
} from '@nestjs/swagger';
import {Result, ResultObject} from '../common/common.interface';
import {Roles} from '../user_role/user_role.decorator';
import {Role} from '../user_role/user_role.interface';
import {MessageService} from '../message/message.service';

@ApiBearerAuth()
@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly messageService: MessageService,
  ) {}

  @Get('session')
  async getSession(@Req() request : Request) : Promise<UserRO> {
    if (request.session && request.session.user) {
      const unread = await this.messageService.getUnreadMessageCount(request.session.user.id);
      return {
        result: Result.SUCCESS,
        session: {
          ...request.session.user,
          unread: unread,
        },
      };
    } else {
      return {
        result: Result.FAIL,
      };
    }
  }

  @Get('list')
  async getUsersList(@Req() req : Request) : Promise<UserRO> {
    try {
      const users = await this.userService.findByUnit(
          req.session.user.unit.id, req.session.user.id);
      return {
        result: Result.SUCCESS,
        users: users,
      };
    } catch (err) {
      return {
        result: Result.ERROR,
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
        message: '정보가 일치하지 않습니다',
      };
    } else if (_user.isConfirmed == false) {
      return {
        result: Result.FAIL,
        message: '승인되지 않은 사용자입니다.',
      };
    } else if (_user.unit.isConfirmed == false) {
      return {
        result: Result.FAIL,
        message: '승인되지 않은 부대입니다.',
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
        result: Result.ERROR,
        message: err,
      };
    }
  }

  @Post('validate')
  async validate(@Body() userdata : CreateUserDto): Promise<UserRO> {
    try {
      const result = await this.userService.validateUser(userdata);
      return result;
    } catch (err) {
      return {
        result: Result.ERROR,
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

  @Patch(':userId')
  @Roles(Role.ADMIN, Role.NORMAL_USER, Role.SUPER_ADMIN)
  async update(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() dto: UpdateUserDto,
    @Req() req: Request,
  ): Promise<ResultObject> {
    try {
      const userData: UserData = req.session.user;
      if (await this.userService.update(userId, dto, userData)) {
        return {result: Result.SUCCESS};
      }
      return {result: Result.FAIL, message: 'Nothing changed'};
    } catch (err) {
      console.log(err);
      return {result: Result.ERROR, message: err.message};
    }
  }

  @Delete(':userId')
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  async delete(
    @Param('userId', ParseIntPipe) userId: number,
    @Req() req: Request,
  ): Promise<ResultObject> {
    try {
      const userData: UserData = req.session.user;
      await this.userService.delete(userId, userData);
      return {result: Result.SUCCESS};
    } catch (err) {
      return {result: Result.ERROR, message: err.message};
    }
  }

  @Delete('self')
  @Roles(Role.NORMAL_USER, Role.SUPER_ADMIN, Role.ADMIN)
  async deleteSelf(@Req() req: Request): Promise<ResultObject> {
    try {
      const userData: UserData = req.session.user;
      await this.userService.deleteSelf(userData);
      await new Promise((res, rej) =>
        req.session.destroy((err) =>
            err ? rej(err) : res(err)
        )
      );
      return {result: Result.SUCCESS};
    } catch (err) {
      return {result: Result.ERROR, message: err.message};
    }
  }

  @Get('role/:roleName')
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  async getUsersByRoleName(@Param('roleName') roleName: Role, @Req() req: Request) {
    try {
      return {
        result: Result.SUCCESS,
        users: await this.userService.getUsersByRoleName(roleName, req.session.user.unit.id),
      };
    } catch (err) {
      return {result: Result.ERROR, message: err.message};
    }
  }
}
