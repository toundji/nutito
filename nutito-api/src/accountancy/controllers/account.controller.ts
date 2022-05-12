/* eslint-disable prettier/prettier */
import { updateAccountDto } from '../dtos/update-account.dto';
import { createAccountDto } from '../dtos/create-account.dto';
import { Body, Delete, Put } from '@nestjs/common';
import { accountService } from '../services/account.service';
import { Account } from '../entities/account.entity';
import { Controller, Get, Param, Post } from "@nestjs/common";

@Controller('acccouts')
export class AccoutController{
    constructor(private readonly accountservice: accountService,){}
    @Get()
    async getAccounts(): Promise<Account[]>{
        return await this.accountservice.findAll();
    }

    @Get(':code')
    async getAccountOnlyById(@Param('code') code): Promise<Account>{
        return await this.accountservice.findOnByCode(code);
    }

    @Post()
    async addAccount(@Body() createaccountdto : createAccountDto): Promise<Account>{
        return await this.accountservice.create(createaccountdto);
    }

    @Put('update/:code')
    async updateAccount(@Param('code') code, @Body() updateaccountdto : updateAccountDto): Promise<Account>{
        return await this.accountservice.update(code, updateaccountdto);
    }

    @Delete('delete/:code')
    async deleteAccount(@Param('code') code){
        return await this.accountservice.deleteAccount(code);
    }


}