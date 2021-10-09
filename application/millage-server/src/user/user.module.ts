import {Module} from '@nestjs/common';
import {UserController} from './user.controller';
import {TypeOrmModule} from '@nestjs/typeorm';
import {UserEntity} from './user.entity';
import {UserService} from './user.service';
import {UnitEntity} from '../unit/unit.entity';
import {UserRoleEntity} from '../user_role/user_role.entity';
import {APP_GUARD} from '@nestjs/core';
import {UserRoleGuard} from 'src/user_role/user_role.guard';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, UnitEntity, UserRoleEntity])],
  providers: [
    UserService,
    {
      provide: APP_GUARD,
      useClass: UserRoleGuard,
    },
  ],
  controllers: [
    UserController,
  ],
  exports: [UserService],
})
export class UserModule {}
