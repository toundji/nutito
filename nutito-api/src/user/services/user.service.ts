import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dtos/create-user.dto';
import { User } from '../entities/user.entity';
import { Slugger } from 'src/utilities/helpers/slugger.helper';
import { hashPassword } from '../../utilities/helpers/functions.helper';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    private readonly usersrepository: Repository<User>,
    private readonly slugger: Slugger
  ) { }

  findAll(): Promise<User[]> {
    return this.usersrepository.find();
  }

  async findOneById(userId: number): Promise<any> {
    const user = await this.usersrepository.findOne({ where: { id: userId } });
    const { id, password, ...rest } = user;
    return rest;
  }

  async findOneByEmail(email: string): Promise<User> {
    const user = await this.usersrepository.findOneOrFail({ where: { email: email } }).catch(
      (error) => {
        throw new NotFoundException(`User with email ${email} is not found`);
      }
    );
    return user;
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    createUserDto.password = await hashPassword(createUserDto.password);
    let user: User = new User();
    Object.keys(createUserDto).forEach(
      attribute => user[attribute] = createUserDto[attribute]
    );
    user.slug = await this.slugger.slugify(user.email);
    const newUser = this.usersrepository.create(user);
    let returnValue = await this.usersrepository.save(newUser).catch(
      (error) => {
        throw new BadRequestException(`Email or phone is already taken !`);
      }
    );
    return returnValue;
  }

  async set_verification_token(user: User, token: string) {
    user.verification_token = token;
    this.usersrepository.save(user);
  }

  async set_user_activity(user: User, state: boolean) {
    user.active = state;
    this.usersrepository.save(user);
  }
}
