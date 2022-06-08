/* eslint-disable prettier/prettier */
import { hashPassword } from './../../utilities/helpers/functions.helper';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dtos/create-user.dto';
import { User } from '../entities/user.entity';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    private readonly usersrepository: Repository<User>
  ) { }

  async findAll(): Promise<User[]> {
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

  async findOneByPhone(phone: string): Promise<User> {
    const user = await this.usersrepository.findOneOrFail({ where: { phone: phone }, relations: ["profile_picture", "agents"] }).catch(
      (error) => {
        throw new NotFoundException(`User with phone ${phone} is not found`);
      }
    );
    return user;
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user: User = new User();
    Object.keys(createUserDto).forEach(
      attribute => user[attribute] = createUserDto[attribute]
    );
    const newUser = this.usersrepository.create(user);
    let returnValue = this.usersrepository.save(newUser).catch(
      (error) => {
        console.log(error)
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

  async checkUserExistenceByEmail(email: string): Promise<any> {
    let userExists = this.findOneByEmail(email)
      .then((result) => true)
      .catch((error) => false); 
    return (await userExists) ? new BadRequestException({ detail: "L'utilisateur existe" }) : { detail: "L'utilisateur n'existe pas" }
  }

  async checkUserExistenceByPhone(phone: string): Promise<any> {
    let userExists = await this.findOneByPhone(phone)
      .then((result) => true)
      .catch((error) => false); 
    return userExists ? new BadRequestException({ detail: "L'utilisateur existe" }) : { detail: "L'utilisateur n'existe pas" }
  }

  async getUserAgents(phone: string): Promise<any> {
    return (await this.findOneByPhone(phone)).agents
  }

}
