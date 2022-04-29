import { BadRequestException, Injectable } from '@nestjs/common';
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

  async findOneById(id: number): Promise<User> {
    const user = await this.usersrepository.findOne({ where: { id: id } });
    return user;
  }

  async findOneByEmail(email: string): Promise<User> {
    const user = await this.usersrepository.findOne({ where: { email: email } });
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
    return this.usersrepository.save(newUser).catch((db_error) => {
      if (/(email)[\s\S]+(already exists)/.test(db_error.detail)) {
        throw new BadRequestException(
          'Account with this email already exists.',
        );
        return db_error;
      }
    });
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
