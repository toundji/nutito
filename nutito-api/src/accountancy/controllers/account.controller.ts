import { CreateAccountDto } from '../dtos/create-account.dto';
import { Body, Delete, Put } from '@nestjs/common';
import { AccountService } from '../services/account.service';
import { Account } from '../entities/account.entity';
import { Controller, Get, Param, Post } from "@nestjs/common";
import { UpdateAccountDto } from '../dtos/update-account.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('acccounts')
@ApiTags('accounts')
export class AccountController{
    constructor(private readonly accountservice: AccountService){}

    @Get()
    async getAccounts(): Promise<Account[]>{
        return await this.accountservice.findAll();
    }

    @Get(':id')
    async getAccountByCode(@Param('id') id: number): Promise<Account> {
        return await this.accountservice.findOneById(id);
    }

    @Post()
    async create(@Body() createAccountdto : CreateAccountDto): Promise<Account>{
        return await this.accountservice.create(createAccountdto);
    }

    @Put('update/:id')
    async updateAccount(
        @Param('id') accountId: number, 
        @Body() updateaccountdto: UpdateAccountDto
    ): Promise<Account>{
        return await this.accountservice.update(accountId, updateaccountdto);
    }

    @Delete('delete/:id')
    async deleteAccount(@Param('id') id: number){
        return await this.accountservice.delete(id);
    }


}