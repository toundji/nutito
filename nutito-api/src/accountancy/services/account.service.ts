/* eslint-disable prettier/prettier */
import { updateAccountDto } from './../dtos/update-account.dto';
import { BadRequestException, HttpException, HttpStatus, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, UpdateResult } from "typeorm";
import { Account } from '../entities/account.entity';
import { CreateAccountDto } from '../dtos/create-account.dto';
import { DeleteResult } from 'typeorm';


export class AccountService {

    constructor(
        @InjectRepository(Account)
        private readonly accountsRepository: Repository<Account>
    ) {}

    findAll(): Promise<Account[]> {
        return this.accountsRepository.find({ relations: ["company"] });
    }

    async findOneById(accountId: number): Promise<Account> {
        const account = await this.accountsRepository.findOneOrFail({ where: { id: accountId }, relations: ["company"] }).catch(
            (error) => {
                throw new NotFoundException({ error: `Account matching id ${accountId} has not been found` });
            }
        );
        return account;
    }

    async update(code: any, account: updateAccountDto ): Promise<UpdateResult>{
        // this.accountRepository.update(account, code);
        const updateAccount = await this.accountsRepository.findOne(code);
        if(updateAccount){
            return await  this.accountsRepository.update(account,code);
        }
        throw new HttpException('Account not Account not found', HttpStatus.NOT_FOUND); 
    
    }

    async deleteAccount(code: string): Promise<DeleteResult>{
        const deleteAccount = await this.accountsRepository.findOne(code);
        if(!deleteAccount){
            throw new HttpException('Account not Account not found', HttpStatus.NOT_FOUND); 
        }
       return await this.accountsRepository.delete(code);

    }
    async findOneBySlug(slug: string): Promise<Account> {
        const account = await this.accountsRepository.findOneOrFail({ where: { slug: slug } }).catch(
          (error) => {
            throw new NotFoundException(`Account matching slug ${slug} has not been found`);
          }
        );
        return account;
    }


    async create(createAccountDto: CreateAccountDto): Promise<Account> {
        let account : Account = new Account();
        Object.keys(createAccountDto).forEach(
          attribute => account[attribute] = createAccountDto[attribute]
        );
        const newAccount = this.accountsRepository.create(account);
        let accountObject = this.accountsRepository.save(newAccount).catch(
          (error) => {
            throw new BadRequestException(`Account already registered`);
          }
        );
        return accountObject;
      }

}