import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository, getRepository, Not} from 'typeorm';
import {MailerService} from '@nestjs-modules/mailer';
import {validate} from 'class-validator';
import * as argon2 from 'argon2';
import * as fs from 'fs';
import * as path from 'path';

import {UserEntity} from './user.entity';
import {UnitEntity} from '../unit/unit.entity';
import {CreateUserDto, LoginUserDto, UpdateUserDto} from './dto';
import {UnitService} from '../unit/unit.service';
import {UserData, UserDataForChat, UserRO} from './user.interface';
import {Result, ResultObject} from '../common/common.interface';
import {Role} from '../user_role/user_role.interface';


@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,

    @InjectRepository(UnitEntity)
    private readonly unitRepository: Repository<UnitEntity>,

    private readonly mailerService: MailerService,

    private readonly unitService: UnitService,
  ) {}

  async validateUser(dto: CreateUserDto): Promise<ResultObject> {
    const {username, email, nickname} = dto;
    let qb = getRepository(UserEntity)
        .createQueryBuilder('user')
        .where('user.username = :username', {username});
    let user = await qb.getOne();
    if (user) {
      return {
        result: Result.FAIL,
        message: 'Duplicate Username',
      };
    }

    qb = getRepository(UserEntity)
        .createQueryBuilder('user')
        .where('user.email = :email', {email});
    user = await qb.getOne();
    if (user) {
      return {
        result: Result.FAIL,
        message: 'Duplicate Email',
      };
    }

    qb = getRepository(UserEntity)
        .createQueryBuilder('user')
        .where('user.nickname = :nickname', {nickname});
    user = await qb.getOne();
    if (user) {
      return {
        result: Result.FAIL,
        message: 'Duplicate Nickname',
      };
    }

    let n;
    if (nickname) {
      n = 0;
    } else if (username) {
      n = 1;
    } else if (email) {
      n = 5;
    }
    return {
      result: Result.SUCCESS,
      message: ''+n,
    };
  }

  async sendUserConfirmedMail(email: string, unitName: string): Promise<void> {
    const htmlStream = fs.readFileSync(
        path.join(__dirname, '/mailTemplate/userConfirmed.html')
    );
    await this.mailerService.sendMail({
      to: email,
      subject: `[Millage 승인 완료] ${unitName} 커뮤니티를 이용하실 수 있습니다.`,
      html: htmlStream, // template 필요
    });
    return;
  }

  async sendUserDeletedMail(email: string, unitName: string): Promise<void> {
    const htmlStream = fs.readFileSync(
        path.join(__dirname, '/mailTemplate/userDeleted.html')
    );
    await this.mailerService.sendMail({
      to: email,
      subject: `[Millage] ${unitName} 부대 관리자가 승인을 거부했습니다.`,
      html: htmlStream,
    });
    return;
  }

  async sendSelfDeletedMail(email: string, unitName: string): Promise<void> {
    const htmlStream = fs.readFileSync(
        path.join(__dirname, '/mailTemplate/selfDeleted.html')
    );
    await this.mailerService.sendMail({
      to: email,
      subject: `[Millage] ${unitName} 정상적으로 회원 탈퇴 되었습니다.`,
      html: htmlStream,
    });
    return;
  }

  async findByUnit(unitId: number, id: number) : Promise<UserDataForChat[]> {
    const users = await this.userRepository.find({
      where: {
        unitId: unitId,
        isConfirmed: true,
        id: Not(id),
      },
      select: ['id', 'nickname'],
    });
    return users;
  }

  async create(dto: CreateUserDto): Promise<UserRO> {
    const {username, email, phonenumber} = dto;
    const qb = getRepository(UserEntity)
        .createQueryBuilder('user')
        .where('user.username = :username', {username})
        .orWhere('user.email = :email', {email})
        .orWhere('user.phonenumber = :phonenumber', {phonenumber});
    const user = await qb.getOne();

    if (user) {
      return {
        result: Result.FAIL,
        message: '이미 회원가입 된 유저입니다',
      };
    }

    if (dto.unitId === -1) {
      try {
        const newUnit = await this.unitService.create(dto.unitName);
        dto.unitId = newUnit.id;
        dto.ownedUnitId = newUnit.id;
      } catch (err) {
        return {
          result: Result.ERROR,
          message: `부대 생성 실패 ${err.message}`,
        };
      }
    }

    const newUser = this.userRepository.create(dto);

    const errors = await validate(newUser);
    if (errors.length > 0) {
      return {
        result: Result.FAIL,
        message: '값이 올바르지 않습니다',
      };
    } else {
      const savedUser = await this.userRepository.save(newUser);
      if (savedUser) {
        return {
          result: Result.SUCCESS,
          session: this.buildUserRO(savedUser),
        };
      } else {
        return {
          result: Result.ERROR,
          message: '알수없는 오류가 발생했습니다',
        };
      }
    }
  }

  async findAll(): Promise<UserEntity[]> {
    return await this.userRepository.find();
  }

  async findOneById(id: number) {
    const user = await this.userRepository.findOne({
      where: {
        id: id,
      },
    });

    return user;
  }

  async findOne(loginUserDto: LoginUserDto) {
    const {username, password} = loginUserDto;
    const user = await this.userRepository.findOne({
      where: {
        username: username,
      },
      select: [
        'id', 'username', 'password', 'email',
        'phonenumber', 'fullname', 'nickname', 'isConfirmed'],
      relations: ['role', 'unit'],
    });
    if (user) {
      const result= await argon2.verify(user.password, password);
      if (result) return user;
    } else return null;
  }

  private checkAuthroity(
      userId: number, userData: UserData, userToUpdate: UserEntity
  ): boolean {
    switch (userData.role.name) {
      case Role.NORMAL_USER: {
        if (userData.id !== userId) {
          return false;
        }
      }
      case Role.ADMIN: {
        if (userData.unit.id !== userToUpdate.unitId) {
          return false;
        }
      }
    }
    return true;
  }

  async update(
      userId: number, dto: UpdateUserDto, userData: UserData
  ): Promise<UserEntity> {
    const userToUpdate = await this.userRepository.findOne(userId, {relations: ['unit']});
    if (!this.checkAuthroity(userId, userData, userToUpdate)) {
      throw new Error('Not authorized user');
    }
    Object.assign(userToUpdate, dto);
    const updatedUser = await this.userRepository.save(userToUpdate);
    if (dto.isConfirmed === true) {
      try {
        await this.sendUserConfirmedMail(updatedUser.email, updatedUser.unit.name);
      } catch (err) {
        console.log(err);
      }
    }
    return updatedUser;
  }

  async delete(id: number, userData: UserData): Promise<void> {
    const userToDelete = await this.userRepository.findOne(id);
    if (userData.role.name === Role.ADMIN && userData.unit.id !== userToDelete.unitId) {
      throw new Error('No authority for the admin with different unitId');
    }
    const email = userToDelete.email;
    await this.userRepository.delete(id);
    try {
      await this.sendUserDeletedMail(email, userData.unit.name);
    } catch (err) {
      console.log(err);
    }
    return;
  }

  async deleteSelf(userData: UserData): Promise<void> {
    const userToDelete = await this.userRepository.findOne(userData.id);
    const email = userToDelete.email;
    await this.userRepository.delete(userData.id);
    try {
      await this.sendSelfDeletedMail(email, userData.unit.name);
    } catch (err) {
      console.log(err);
    }
    return;
  }


  async getUsersByRoleName(roleName: Role, id: number): Promise<UserEntity[]> {
    if (roleName == Role.ADMIN) {
      return await this.userRepository.find({
        where: {
          unitId: id,
        },
        relations: ['role', 'unit'],
      });
    } else {
      return await this.userRepository.find({
        relations: ['role', 'unit'],
      });
    }
  }


  private buildUserRO(user: UserEntity) {
    const data = {
      id: user.id,
      username: user.username,
      fullname: user.fullname,
      nickname: user.nickname,
      email: user.email,
      unit: user.unit,
      phonenumber: user.phonenumber,
      role: user.role,
    };

    return data;
  }
}
