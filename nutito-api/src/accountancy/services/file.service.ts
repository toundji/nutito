/* eslint-disable prettier/prettier */
import { UserService } from './../../user/services/user.service';
import { CompanyService } from './company.service';
import { CreateFileDto } from './../dtos/create-file.dto';
import { DeleteResult } from 'typeorm';
import { Fichier } from '../entities/fichier.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OperationService } from './operation.service';
import { User } from '../../user/entities/user.entity';
import { Operation } from '../entities/operation.entity';
@Injectable()
export class FileService{
    constructor(
        @InjectRepository(Fichier)
        private readonly fileRepository : Repository<Fichier>,
        private readonly companySerice: CompanyService,
        private readonly userService: UserService,
        private readonly operationService: OperationService
    ){}

    async findAll(): Promise<Fichier[]>{
        return await this.fileRepository.find();
    }

    async findOnById(id: number): Promise<Fichier>{
         const companny = await this.fileRepository.findOneOrFail({where : { id : id}}).catch(
            (error)=> {
                throw new NotFoundException(`File with id ${id} is not found`);
            }
         )
         return companny;
    }

    async delete(id :number): Promise<DeleteResult>{
        return  this.fileRepository.softDelete(id);

    }

    async create(createFileDto: CreateFileDto): Promise<Fichier>{
        const newFile = new Fichier()
        Object.keys(createFileDto).forEach(key => newFile[key] = createFileDto[key])
        let user: User
        let operation: Operation
        try {
            user = await this.userService.findOneById(createFileDto.entity_id)
            operation = await this.operationService.findOneById(createFileDto.entity_id)
        } catch (error) {
            // do nothing
        }
        const statgedFile = this.fileRepository.create(newFile);
        const savedFile =  await statgedFile.save()
        user.profile_picture = savedFile
        this.userService.save(user)
        return savedFile
    }
    
    // async update(updateFileDto: UpdateFileDto, id:number):Promise<File>{

    //     const updateFile= await this.findOnById(id);
    //     updateFile.name= updateFileDto.name ? updateFileDto.name : updateFile.name;
    //     updateFile.location= updateFileDto.location ? updateFileDto.location : updateFile.location;
    //     updateFile.mimetype= updateFileDto.mimetype ? updateFileDto.mimetype : updateFile.mimetype;
    //     updateFile.entity_id= updateFileDto.entity_id ? updateFileDto.entity_id : updateFile.entity_id ;
    //     updateFile.operation.id =updateFileDto.operation_id? await (await this.companySerice.findOnById(updateFileDto.operation_id)).id : undefined;
    //     updateFile.user= updateFileDto.user_id ? await this.userService.findOneById(updateFileDto.user_id): undefined;

    //     return await this.FileRepository.save(updateFile);
    // }

}