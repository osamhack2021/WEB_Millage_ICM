import {MiddlewareConsumer, Module, NestModule, RequestMethod} from '@nestjs/common';
import {UserController} from './user.controller';
import {TypeOrmModule} from '@nestjs/typeorm';
import {UserEntity} from './user.entity';
import {UserService} from './user.service';
import {UnitEntity} from '../unit/unit.entity';
import {UserRoleEntity} from '../user_role/user_role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, UnitEntity, UserRoleEntity])],
  providers: [UserService],
  controllers: [
    UserController,
  ],
  exports: [UserService],
})
export class UserModule {}
