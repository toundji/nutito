/* eslint-disable prettier/prettier */
import { UpdateFileDto } from './../dtos/update-file.dto';
import { FileService } from './../services/file.service';
import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { CreateFileDto } from '../dtos/create-file.dto';
import { Fichier } from '../entities/fichier.entity';

@Controller('files')
export class FileController{
    constructor(private fileService: FileService){}

    @Post('/create')
    async createCarrer(@Body() createFileDto : CreateFileDto): Promise<File>{
        return await this.fileService.create(createFileDto);
    }
  
    @Get()
    async getAllFile(): Promise<Fichier[]>{
        return await this.fileService.findAll();
    }
  
    @Get('/:id')
    async getFileById(
        @Param('id') id :number
    ): Promise<Fichier>{
        return await this.fileService.findOnById(id);
    } 
    
    @Put('update/:id')
    async updateAccount(@Param('id') id : number, @Body() updateFileDto : UpdateFileDto){
        return await this.fileService.update(updateFileDto, id);
    }
  
    @Delete('delete/:id')
    async deleteAccount(@Param('id') id : number){
        return await this.fileService.delete(id);
    }
}