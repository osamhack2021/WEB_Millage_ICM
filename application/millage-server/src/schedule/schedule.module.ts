import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {UserEntity} from '../user/user.entity';
import {UserRoleEntity} from '../user_role/user_role.entity';
import {ScheduleController} from './schedule.controller';
import {ScheduleEntity} from './schedule.entity';
import {ScheduleService} from './schedule.service';

@Module({
  imports: [TypeOrmModule.forFeature([ScheduleEntity, UserRoleEntity, UserEntity])],
  providers: [ScheduleService],
  controllers: [ScheduleController],
  exports: [ScheduleService],
})
export class ScheduleModule {}
