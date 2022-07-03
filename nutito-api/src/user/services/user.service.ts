/* eslint-disable prettier/prettier */
import { hashPassword } from './../../utilities/helpers/functions.helper';
import { BadRequestException, HttpException, HttpStatus, Injectable, Logger, NotFoundException, UploadedFile } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dtos/create-user.dto';
import { User } from '../entities/user.entity';
import { DateTime, Duration } from 'luxon';
import { UserTypeEnum } from 'src/utilities/enums/user-type.enum';
import { UpdateUserByPseudoDto } from '../dtos/update-user-by-pseudo.dto';
import { UpdateUserDto } from './../dtos/update-user.dto';
import { InternalServerErrorException } from '@nestjs/common';
import { Fichier } from 'src/accountancy/entities/fichier.entity';
import { compare, hash } from 'bcrypt';
import { ChangeEmailDto } from 'src/accountancy/dtos/change-emeail.dto';
import { ChangePasswordDto } from 'src/accountancy/dtos/change-password.dto';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) { }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOneById(userId: number): Promise<Partial<User>> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    const { id, password, ...rest } = user;
    return rest;
  }

  async findOneForLogin(userId: number): Promise<Partial<User>> {
    const user = await this.userRepository.findOne({ where: { id: userId }, relations: ["agents", "agents.company"] });
    const { id, password, ...rest } = user;
    return rest;
  }


  async findOneByEmail(email: string): Promise<User> {
    const user = await this.userRepository.find({ where: { email: email },  relations: ["profile_picture", "agents", "agents.company"] })
    .then(
      (list:User[]) => {
        if(list && list.length>0)return list[0];
        throw new NotFoundException(`User with email ${email} is not found`);
      })
    .catch(
      (error) => {
        throw new NotFoundException(`User with email ${email} is not found`);
      }
    );
    return user;
  }

  async findOneByPhone(phone: string): Promise<User> {
    const user = await this.userRepository.find({ where: { phone: phone }, relations: ["profile_picture", "agents", "agents.company"] })
    .then(
      (list:User[]) => {
        if(list && list.length>0)return list[0];
        throw new NotFoundException(`User with phone ${phone} is not found`);
      })
      .catch(
      
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
    const newUser = this.userRepository.create(user);
    let returnValue = this.userRepository.save(newUser).catch(
      (error) => {
        console.log(error)
        throw new BadRequestException(`Email or phone is already taken !`);
      }
    );
    return returnValue;
  }

  async changePasswordByPseudo(updateUserDto: UpdateUserByPseudoDto): Promise<User> {
    const user = await this.findOneByEmail(updateUserDto.email)
    user.password = updateUserDto.password
    user.save()
    return user;
  }

  
  async update(updateUserDto: UpdateUserDto, user:User): Promise<User> {
   await this.userRepository.update(user.id, updateUserDto).catch((error)=>{
     console.log(error);
     throw new InternalServerErrorException(error.message);
   });
    Object.keys(updateUserDto).forEach((key:string)=>{
      user[key] = updateUserDto[key];
    });
    return user;
  }

  async changePassword( body: ChangePasswordDto, user:User): Promise<string> {
    const areEqual = await compare( body.old, user.password);
    if (!areEqual) {
      throw new HttpException(
        "Nom d'utilisateur ou mot de passe invalide ",
        HttpStatus.UNAUTHORIZED,
      );
    }

    // return user;
    await this.userRepository.update(user.id, {password: await hash(body.nevel, 10) });

    return "Mot de pass mise à jour avec succès";
  }

  async changePhone( body: ChangePasswordDto, user:User): Promise<string> {
    if(body.old?.trim() &&  body.old?.trim() != user.phone.trim()){
      throw new HttpException(
        "L'ancien numéro de téléphone que vous avez indiqué ne correspond pas au numéro existant",
        HttpStatus.UNAUTHORIZED,
      );
    }
    this.userRepository.find({where:[{phone: body.nevel}, {phone: body.nevel.trim()}]}).then((users:[])=>{
      if(users.length > 1){
        throw new BadRequestException("L'ancien numéro de téléphone que vous avez indiqué existe déjà")
      }
    });

    // return user;
    await this.userRepository.update(user.id, {phone:  body.nevel.trim()  });
    return "Mot de pass mise à jour avec succès";
  }

  async changeEmail( body: ChangeEmailDto, user:User): Promise<string> {
    if(body.old?.trim() &&  body.old?.trim() != user.email.trim()){
      throw new HttpException(
        "L'ancien email que vous avez indiqué ne correspond pas à l'email existant",
        HttpStatus.UNAUTHORIZED,
      );
    }

    this.userRepository.find({where:[{email: body.nevel}, {email: body.nevel.trim()}]}).then((users:[])=>{
      if(users.length > 1){
        throw new BadRequestException("L'email que vous avez indiqué existe déjà")
      }
    }).catch((error)=>{
      throw new InternalServerErrorException("Vérification d'email: " + error.message);
    });

    // return user;
    await this.userRepository.update(user.id, {email:  body.nevel.trim().toLowerCase()});

    return "Mot de pass mise à jour avec succès";
  }
  async updateProfile(@UploadedFile() profile, createur: User) {
    const user: User =await User.findOne(createur.id);
    const file: Fichier = new Fichier();
    const name = profile.originalname.split(".")[0];

    file.creator_id = createur?.id;
    file.name = name,
    file.location= profile.path,
    file.mimetype= profile.mimetype,
    file.entity_name = "users";
    file.entity_id= createur.id;
    const savedFile: Fichier= await file.save().catch((e)=>{
      Logger.error(e);
      throw new BadRequestException(
        "Sauvegarde d'image profile: données invalides",
      );
    });
    user.profile_picture = savedFile;
    return User.save(user).catch((e)=>{
      Logger.error(e);
      throw new BadRequestException(
        "Mise à jour du profile: données invalides",
      );
    });
  }

  
 async getImageProfile(id:number):Promise<Fichier>{
  const user:User = await User.findOne(id, {relations: ["profile_picture"]});
  return user.profile_picture;
}

  async set_verification_token(user: User, token: string) {
    user.verification_token = token;
    this.userRepository.save(user);
  }

  async set_user_activity(user: User, state: boolean) {
    user.active = state;
    this.userRepository.save(user);
  }

  async checkUserExistenceByEmail(email: string): Promise<any> {
    return this.userRepository.count({email:email})
    .then((result) =>{
      console.log(result);
      
      if(result && result>0){
        throw new BadRequestException({ detail: "L'utilisateur existe" }); 
      }else return  { detail: "L'utilisateur n'existe pas" };
    })
    .catch((error) =>  {throw new BadRequestException({ detail: "L'utilisateur existe" });} );
  }

  async checkUserExistenceByPhone(phone: string): Promise<any> {
    return await this.userRepository.count({phone:phone})
      .then((result) => {
        console.log(result);

        if(result && result>0){
          throw new BadRequestException({ detail: "L'utilisateur existe" }); 
        }else return  { detail: "L'utilisateur n'existe pas" };
       })
      .catch((error) =>  {throw new BadRequestException({ detail: "L'utilisateur existe" });} );
  }

  async getUserAgents(phone: string): Promise<any> {
    return (await this.findOneByPhone(phone)).agents
  }

  async init(){
    const olds:User[] =await this.userRepository.find();
    if(olds && olds.length > 0){
      return olds;
    }

      const user =[ {
        email: "baba@gmail.com",
        phone: "+22994851785",
        ifu: "12345678",
        birth_date: DateTime.now().minus(Duration.fromObject({year:24})).toJSDate(),
        birth_place: "Doumè",
        address: "Benin/savalou/Doumè/Zongo/maison-Daniel",
        country: "Country",
        password: "gggggggg",
        user_type: UserTypeEnum.ADMIN,
      },
  
      {
        email: "baba0@gmail.com",
        phone: "+22994851780",
        password: "gggggggg",
        user_type: UserTypeEnum.USER,
      },
      {
        email: "baba1@gmail.com",
        phone: "+22994851781",
        ifu: "12345678",
        birth_date: DateTime.now().minus(Duration.fromObject({year:24})).toJSDate(),
        birth_place: "Doumè",
        address: "Benin/savalou/Doumè/Zongo/maison-Daniel",
        country: "Country",
        password: "gggggggg",
        user_type: UserTypeEnum.USER,
      },
    ];
  
     const user_: User[] = this.userRepository.create(user);
  
     return this.userRepository.save(user_);
  
   
  }

}
