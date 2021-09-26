import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository, getRepository, DeleteResult} from 'typeorm';
import {UserEntity} from './user.entity';
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

  async create(dto: CreateUserDto): Promise<UserRO>{
     const {username, email, phonenumber, password} = dto;
     const qb = await getRepository(UserEntity)
       .createQueryBuilder('user')
       .where('user.username = :username', { username })
       .orWhere('user.email = :email', { email })
       .orWhere('user.phonenumber = :phonenumber', { phonenumber });
     const user = await qb.getOne();
 
     if (user) {
       const errors = {username: '이미 회원가입 된 유저입니다.'};
       throw new HttpException({message: 'Input data validation failed', errors}, HttpStatus.BAD_REQUEST);
 
     }
 
     // create new user
     let newUser = new UserEntity();
     newUser.username = dto.email;
     newUser.password = dto.password;
     newUser.email = dto.email;
     newUser.phonenumber = dto.phonenumber;
     newUser.fullname = dto.fullname;
     newUser.nickname = dto.nickname;
     newUser.unit.id = dto.unitId;
 
     const errors = await validate(newUser);
     if (errors.length > 0) {
       const _errors = {username: 'Userinput is not valid.'};
       throw new HttpException({message: 'Input data validation failed', _errors}, HttpStatus.BAD_REQUEST);
 
     } else {
       const savedUser = await this.userRepository.save(newUser);
       return this.buildUserRO(savedUser);
     }
 
  }

  async findAll(): Promise<UserEntity[]> {
    return await this.userRepository.find();
  }

  async findById(id: number): Promise<UserRO> {
    const user = await this.userRepository.findOne(id);

    if (!user) {
      const errors = {User: ' not found'};
      throw new HttpException({errors}, 401);
    }

    return this.buildUserRO(user);
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
      unit: user.unit,
      phonenumber: user.phonenumber,
    };

    return {user: data};
  }
}
