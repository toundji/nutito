/* eslint-disable prettier/prettier */
import { BadRequestException, HttpException, HttpStatus, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Account } from '../entities/account.entity';
import { CreateAccountDto } from '../dtos/create-account.dto';
import { UpdateAccountDto } from "../dtos/update-account.dto";

export class AccountService {

    constructor(
        @InjectRepository(Account)
        private readonly accountsRepository: Repository<Account>
    ) {}

    findAll(): Promise<Account[]> {
        return this.accountsRepository.find({  });
    }

    async findOneById(accountId: number): Promise<Account> {
        const account = await this.accountsRepository.findOneOrFail({ where: { id: accountId } }).catch(
            (error) => {
                throw new NotFoundException({ error: `Account matching id ${accountId} has not been found` });
            }
        );
        return account;
    }

    // async update(code: any, account: UpdateAccountDto ): Promise<UpdateResult>{
    //     // this.accountRepository.update(account, code);
    //     const updateAccount = await this.accountsRepository.findOne(code);
    //     if(updateAccount){
    //         return await  this.accountsRepository.update(account,code);
    //     }
    //     throw new HttpException('Account not Account not found', HttpStatus.NOT_FOUND); 
    
    // }

    async deleteAccount(code: string): Promise<any> {
        const deleteAccount = await this.accountsRepository.findOne(code);
        if(!deleteAccount){
            throw new HttpException('Account not Account not found', HttpStatus.NOT_FOUND); 
        }
       return await this.accountsRepository.delete(code);

    }
    async findOneByCode(code: string): Promise<Account> {
        const account = await this.accountsRepository.findOneOrFail({ where: { code: code } }).catch(
          (error) => {
            throw new NotFoundException(`Account matching code ${code} has not been found`);
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

    async update(accountId: number, updateAccountDto: UpdateAccountDto): Promise<Account> {
      let account = await this.findOneById(accountId);
      Object.keys(updateAccountDto).forEach(
        attribute => account[attribute] = updateAccountDto[attribute]
      );
      let updated = await account.save();
      return updated;
    }

    async delete(accountId: number): Promise<any> {
      let account = await this.findOneById(accountId);
      Account.softRemove(account);
      return;
    }

}