import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository, getRepository} from 'typeorm';
import {UserEntity} from './user.entity';
import {UnitEntity} from '../unit/unit.entity';
import {CreateUserDto, LoginUserDto} from './dto';
import {validate} from 'class-validator';
import * as argon2 from 'argon2';
import {UserRoleEntity} from '../user_role/user_role.entity';
import {UserRO} from './user.interface';
import {Result} from '../common/common.interface';


@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,

    @InjectRepository(UnitEntity)
    private readonly unitRepository: Repository<UnitEntity>,

    @InjectRepository(UserRoleEntity)
    private readonly userRoleRepository: Repository<UserRoleEntity>
  ) {}

  async create(dto: CreateUserDto): Promise<UserRO> {
    const {username, email, phonenumber} = dto;
    const qb = await getRepository(UserEntity)
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

    // create new user
    const newUser = new UserEntity();
    newUser.username = dto.username;
    newUser.password = dto.password;
    newUser.email = dto.email;
    newUser.phonenumber = dto.phonenumber;
    newUser.fullname = dto.fullname;
    newUser.nickname = dto.nickname;
    newUser.unitId = dto.unitId;
    newUser.roleId = dto.roleId;

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

  async findOne(loginUserDto: LoginUserDto) {
    const {username, password} = loginUserDto;
    const user = await this.userRepository.findOne({
      where: {
        username: username,
      },
      relations: ['role', 'unit'],
    });

    const result= await argon2.verify(user.password, password);
    if (result) return user;
    else return null;
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
