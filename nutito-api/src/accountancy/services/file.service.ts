/* eslint-disable prettier/prettier */
import { UserService } from './../../user/services/user.service';
import { CompanyService } from './company.service';
import { CreateFileDto } from './../dtos/create-file.dto';
import { UpdateFileDto } from './../dtos/update-file.dto';
import { DeleteResult, UpdateResult } from 'typeorm';
import { File } from './../entities/file.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
@Injectable()
export class FileService{
    constructor(
        @InjectRepository(File)
        private readonly FileRepository : Repository<File>,
        private readonly companySerice: CompanyService,
        private readonly userService: UserService
    ){}

    async findAll(): Promise<File[]>{
        return await this.FileRepository.find();
    }

    async findOnById(id: number): Promise<File>{
         const companny = await this.FileRepository.findOneOrFail({where : { id : id}}).catch(
            (error)=> {
                throw new NotFoundException(`File with id ${id} is not found`);
            }
         )
         return companny;
    }

    async delete(id :number): Promise<DeleteResult>{
        return  this.FileRepository.softDelete(id);

    }

    async create(createFileDto: CreateFileDto):Promise<File>{
        const nv = await this.FileRepository.create(createFileDto);
        return await this.FileRepository.save(nv);
    }
    
    async update(updateFileDto: UpdateFileDto, id:number):Promise<File>{

        const updateFile= await this.findOnById(id);
        updateFile.name= updateFileDto.name ? updateFileDto.name : updateFile.name;
        updateFile.location= updateFileDto.location ? updateFileDto.location : updateFile.location;
        updateFile.mimetype= updateFileDto.mimetype ? updateFileDto.mimetype : updateFile.mimetype;

        return await this.FileRepository.save(updateFile);
    }

}