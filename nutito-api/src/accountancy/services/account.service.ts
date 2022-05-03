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
       await this.accountRepository.update(account, code);
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


}