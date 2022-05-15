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
        private readonly FileRepository : Repository<File>
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

    
    async update(updateFileDto: UpdateFileDto, id:number):Promise<UpdateResult>{
        return await this.FileRepository.update(id,updateFileDto);
    }

}