/* eslint-disable prettier/prettier */
import { Operation } from './../entities/operation.entity';
import { OperationService } from './operation.service';
import { UserService } from './../../user/services/user.service';
import { UpdateFileDto } from './../dtos/update-File.dto';
import { CreateFileDto } from './../dtos/create-File.dto';
import { Slugger } from 'src/utilities/helpers/slugger.helper';
import { DeleteResult, UpdateResult } from 'typeorm';
import { File } from './../entities/File.entity';
import { Injectable, NotFoundException, Catch } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { retry } from 'rxjs';
@Injectable()
export class FileService{
    constructor(
        @InjectRepository(File)
        private readonly FileRepository : Repository<File>,
        private readonly slugger: Slugger,
        private readonly userService: UserService,
        private readonly operationService : OperationService

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

    async create(fileCreateDto : CreateFileDto): Promise<File>{
        const newFile = new File();
        const user = await this.userService.findOneById(fileCreateDto.user_id);
        const operation = await this.operationService.findOneById(fileCreateDto.operation_id);

        newFile.operation.id = operation.id;

        newFile.save();
        return newFile;

    }

    async update(updateFileDto: UpdateFileDto, id:number):Promise<UpdateResult>{
        return await this.FileRepository.update(id,updateFileDto);
    }

}