import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository, getRepository, DeleteResult, SimpleConsoleLogger} from 'typeorm';
import {UserEntity} from './user.entity';
import {UnitEntity} from '../unit/unit.entity';
import {CreateUserDto, LoginUserDto, UpdateUserDto} from './dto';
const jwt = require('jsonwebtoken');
import {SECRET} from '../config';
import {UserData, UserRO} from './user.interface';
import {validate} from 'class-validator';
import {HttpException} from '@nestjs/common/exceptions/http.exception';
import {HttpStatus} from '@nestjs/common';
import * as argon2 from 'argon2';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {}

  async create(dto: CreateUserDto): Promise<UserRO> {
    const {username, email, phonenumber, password} = dto;
    const qb = await getRepository(UserEntity)
        .createQueryBuilder('user')
        .where('user.username = :username', {username})
        .orWhere('user.email = :email', {email})
        .orWhere('user.phonenumber = :phonenumber', {phonenumber});
    const user = await qb.getOne();

    if (user) {
      return {
        result: 'registerfail',
        message: '이미 회원가입 된 유저입니다',
      };
    }

    // create new user
    const newUser = new UserEntity();
    newUser.username = dto.username;
    newUser.password = dto.password;
    newUser.email = dto.email;
    newUser.phonenumber = dto.phonenumber;
    newUser.fullname = dto.fullname;
    newUser.nickname = dto.nickname;
    newUser.unitId = dto.unitId;
    newUser.auth = dto.auth;

    const errors = await validate(newUser);
    if (errors.length > 0) {
      return {
        result: 'registerfail',
        message: '값이 올바르지 않습니다',
      };
    } else {
      const savedUser = await this.userRepository.save(newUser);
      if (savedUser) {
        return {
          result: 'success',
          session: this.buildUserRO(savedUser),
        };
      } else {
        return {
          result: 'registerfail',
          message: '알수없는 오류가 발생했습니다',
        };
      }
    }
  }

  async findAll(): Promise<UserEntity[]> {
    return await this.userRepository.find();
  }

  async findOne(loginUserDto: LoginUserDto) {
    const {username, password} = loginUserDto;
    const user = await this.userRepository.findOne({
      where: {
        username: username,
        password: password,
      },
    });

    return user;
  }


  private buildUserRO(user: UserEntity) {
    const data = {
      id: user.id,
      username: user.username,
      fullname: user.fullname,
      nickname: user.nickname,
      email: user.email,
      unitId: user.unitId,
      phonenumber: user.phonenumber,
      auth: user.auth,
    };

    return data;
  }
}
