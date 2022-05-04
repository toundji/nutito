/* eslint-disable prettier/prettier */
import { Career } from './../entities/career.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { CreateCareerDto } from './../dtos/create-career.dto';
import { Repository } from 'typeorm';
@Injectable()
export class careerService{
    constructor(
        @InjectRepository(Career)
        private readonly carrerrRepository: Repository<Career>
        
    ){}

    async create(career : Career): Promise<Career>{
       const nvcareer = await this.carrerrRepository.create(career);
        return this.carrerrRepository.save(nvcareer);
    }







}