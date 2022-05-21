import { CreateAccountDto } from '../dtos/create-account.dto';
import { Body, Delete, Put } from '@nestjs/common';
import { AccountService } from '../services/account.service';
import { Account } from '../entities/account.entity';
import { Controller, Get, Param, Post } from "@nestjs/common";
import { UpdateAccountDto } from '../dtos/update-account.dto';

@Controller('acccounts')
export class AccountController{
    constructor(private readonly accountservice: AccountService){}

<<<<<<< HEAD
=======
@Controller('acccouts')
export class AccoutController{
    constructor(private readonly accountservice: AccountService){}
>>>>>>> 8e221fab06d8f4d8daab9d86e3e36eafd046b2d5
    @Get()
    async getAccounts(): Promise<Account[]>{
        return await this.accountservice.findAll();
    }

    @Get(':code')
<<<<<<< HEAD
    async getAccountById(@Param('code') code: string): Promise<Account> {
        return await this.accountservice.findOneBySlug(code);
    }

    @Post()
    async create(@Body() createAccountdto : CreateAccountDto): Promise<Account>{
        return await this.accountservice.create(createAccountdto);
    }

    @Put('update/:id')
    async updateAccount(@Param('id') accountId: number, @Body() updateaccountdto: UpdateAccountDto): Promise<Account>{
        return await this.accountservice.update(accountId, updateaccountdto);
    }

    @Delete('delete/:id')
    async deleteAccount(@Param('id') id: number){
        return await this.accountservice.delete(id);
=======
    async getAccountOnlyById(@Param('code') code): Promise<Account>{
        return await this.accountservice.findOneById(code);
    }

    @Post('create/')
    async addAccount(@Body() createaccountdto : CreateAccountDto): Promise<Account>{
        return await this.accountservice.create(createaccountdto);
    }

    @Put('update/:code')
    async updateAccount(@Param('code') code, @Body() updateaccountdto : updateAccountDto){
        return await this.accountservice.update(code, updateaccountdto);
    }

    @Delete('delete/:code')
    async deleteAccount(@Param('code') code){
        return await this.accountservice.deleteAccount(code);
>>>>>>> 8e221fab06d8f4d8daab9d86e3e36eafd046b2d5
    }


}