import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository, getRepository} from 'typeorm';
import {MailerService} from '@nestjs-modules/mailer';
import {validate} from 'class-validator';
import * as argon2 from 'argon2';
import * as fs from 'fs';
import * as path from 'path';

import {UserEntity} from './user.entity';
import {UnitEntity} from '../unit/unit.entity';
import {CreateUserDto, LoginUserDto, UpdateUserDto} from './dto';
import {UserRoleEntity} from '../user_role/user_role.entity';
import {UserRO} from './user.interface';
import {Result, ResultObject} from '../common/common.interface';
import {Role} from '../user_role/user_role.interface';


@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,

    @InjectRepository(UnitEntity)
    private readonly unitRepository: Repository<UnitEntity>,

    @InjectRepository(UserRoleEntity)
    private readonly userRoleRepository: Repository<UserRoleEntity>,

    private readonly mailerService: MailerService,
  ) {}

  async validateUser(dto: CreateUserDto): Promise<ResultObject> {
    const {username, email, nickname} = dto;
    let qb = await getRepository(UserEntity)
        .createQueryBuilder('user')
        .where('user.username = :username', {username});
    let user = await qb.getOne();
    if (user) {
      return {
        result: Result.FAIL,
        message: 'Duplicate Username',
      };
    }

    qb = await getRepository(UserEntity)
        .createQueryBuilder('user')
        .where('user.email = :email', {email});
    user = await qb.getOne();
    if (user) {
      return {
        result: Result.FAIL,
        message: 'Duplicate Email',
      };
    }

    qb = await getRepository(UserEntity)
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

  private async createNewUnit(name: string): Promise<UnitEntity> {
    const newUnit = this.unitRepository.create({name: name});
    return await this.unitRepository.save(newUnit);
  }

  async sendUserConfirmedMail(email: string, unitId: number): Promise<boolean> {
    const unit = await this.unitRepository.findOne(unitId);
    const htmlStream = fs.readFileSync(
        path.join(__dirname, '/mailTemplate/userConfirmed.html')
    );
    await this.mailerService.sendMail({
      to: email,
      subject: `[Millage 승인 완료] ${unit.name} 커뮤니티를 이용하실 수 있습니다.`,
      html: htmlStream, // template 필요
    });
    return true;
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
        const newUnit = await this.createNewUnit(dto.unitName);
        dto.unitId = newUnit.id;
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

  async update(id: number, dto: UpdateUserDto): Promise<boolean> {
    const previousUser = await this.userRepository.findOne(id);
    if (previousUser === undefined) {
      throw new Error(`Cannot find user by id ${id}`);
    }
    try {
      const updateResult = await this.userRepository.update(id, dto);
      if (updateResult.affected === 0) {
        return false;
      }
      if (dto.isConfirmed === true) {
        // userRepositoy.create 안쓰니까 오류남. 근데 create 쓰니까 업데이트가 오류남.
        // const confirmedUser = updateResult.generatedMaps[0] as UserEntity;
        // await this.sendUserConfirmedMail(confirmedUser.email, confirmedUser.unitId);
      }
      return true;
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async delete(id: number): Promise<boolean> {
    try {
      await this.userRepository.delete({
        id: id,
      });

      // add send email

      return true;
    } catch (err) {
      throw new Error(err.message);
    }
  }


  async getUsersByRoleName(roleName: Role): Promise<UserEntity[]> {
    const normalUserRole = await this.userRoleRepository.findOne({
      where: {name: roleName},
    });
    return await this.userRepository.find({
      where: {roleId: normalUserRole.id},
      relations: ['role', 'unit'],
    });
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
