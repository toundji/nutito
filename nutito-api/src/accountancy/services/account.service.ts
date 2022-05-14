<<<<<<< HEAD
/* eslint-disable prettier/prettier */
import { createAccountDto } from './../dtos/create-account.dto';
import { Account } from './../entities/account.entity';
import { Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Slugger } from 'src/utilities/helpers/slugger.helper';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { updateAccountDto } from '../dtos/update-account.dto';

@Injectable()
export class accountService{
    constructor(
        @InjectRepository(Account)
        private readonly accountRepository: Repository<Account>,
        private readonly sluger: Slugger
    ){}


    findAll(): Promise<Account[]>{
        return this.accountRepository.find();
    }

    findOnByCode(code: string): Promise<Account>{
        const account = this.accountRepository.findOneOrFail(code);
        if(account){
            return account;
        }
        throw new HttpException('Account not found', HttpStatus.NOT_FOUND);
    }

    async create(account : createAccountDto): Promise<Account>{
        const newAccount = await this.accountRepository.create(account);
        return await this.accountRepository.save(newAccount);
    }

    async update(code: any, account: updateAccountDto ): Promise<Account>{
        this.accountRepository.update(account, code);
        const updateAccount = await this.accountRepository.findOne(code);
        if(updateAccount){
            return updateAccount;
        }
        throw new HttpException('Account not Account not found', HttpStatus.NOT_FOUND); 
    
    }

    async deleteAccount(code: string){
        await this.accountRepository.delete(code);
        const deleteAccount = await this.accountRepository.findOne(code);
        if(!deleteAccount){
            throw new HttpException('Account not Account not found', HttpStatus.NOT_FOUND); 
        }
    }

=======
import { BadRequestException, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Account } from '../entities/account.entity';
import { CreateAccountDto } from '../dtos/create-account.dto';

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

    async findOneBySlug(slug: string): Promise<Account> {
        const account = await this.accountsRepository.findOneOrFail({ where: { slug: slug } }).catch(
          (error) => {
            throw new NotFoundException(`Account matching slug ${slug} has not been found`);
          }
        );
        return account;
    }


    async create(createAccountDto: CreateAccountDto): Promise<Account> {
        let account = new Account();
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
>>>>>>> dev

}