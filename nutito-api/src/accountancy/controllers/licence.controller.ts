/* eslint-disable prettier/prettier */
import { UpdateLicenceDto } from './../dtos/update-licence.dto';
import { CreateLicenceDto } from './../dtos/create-licence.dto';
import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { LicenceService } from "../services/licence.service";
import { Licence } from '../entities/licence.entity';
import { ApiTags } from '@nestjs/swagger';
@Controller('licences')
@ApiTags('licences')
export class LicenceController{
    constructor(private licenceService: LicenceService){}

    @Post('/create')
    async create(@Body() createLicenceDto : CreateLicenceDto): Promise<any>{
        return await this.licenceService.create(createLicenceDto);
    }
  
    @Get()
    async getAllLicence(): Promise<Licence[]>{
        return await this.licenceService.findAll();
    }
  
    @Get('/:id')
    async gtLicenceById(
        @Param('id') id :number
    ): Promise<Licence>{
        return await this.licenceService.findOnById(id);
    } 
    
    @Put('update/:id')
    async update(@Param('id') id : number, @Body() updateLicenceDto : UpdateLicenceDto){
        return await this.licenceService.update(updateLicenceDto, id);
    }
  
    @Delete('delete/:id')
    async delete(@Param('id') id : number){
        return await this.licenceService.delete(id);
    }
}