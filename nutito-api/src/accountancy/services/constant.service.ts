import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateConstantDto } from "../dtos/create-constant.dto";
import { Constant } from "../entities/constant.entity";


@Injectable()
export class ConstantService {

    constructor(
        @InjectRepository(Constant)
        private readonly constantsRepository: Repository<Constant>,
    ) {}

    async findOneByName(name: string): Promise<Constant> {
        const constant = this.constantsRepository
            .findOneOrFail({ where: { name: name } })
            .catch((error) => {
                throw new NotFoundException(`La constante du npm ${name} n'a pas été trouvée`)
            })
        return constant;
    }

    async create(createConstantDto: CreateConstantDto) {
        const newConstant = new Constant();
        Object.keys(createConstantDto).forEach(
            (key) => {
                newConstant[key] = createConstantDto[key];
            }
        );
        return newConstant.save();
    }

    init(): Promise<Constant[]>{
        return this.constantsRepository.find().then((olds)=>{
            if(olds && olds.length > 0){
                console.log(olds);

                return olds;
              }
        
                const fields = [
                    {
                        name:"PRIX MENSUEL",
                        value: "1000"
                    },
                    {
                        name:"PRIX ANNUEL",
                        value: "1000"                    },
                   
                ];
                const l =  this.constantsRepository.create(fields);
                return this.constantsRepository.save(l);
            
        })
    }

}