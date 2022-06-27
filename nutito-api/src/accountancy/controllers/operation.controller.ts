import { OperationService } from './../services/operation.service';
import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { CreateOperationDto } from '../dtos/create-operation.dto';
import { Operation } from '../entities/operation.entity';
import { UpdateOperationDto } from '../dtos/update-operation.dto';
import { ApiTags } from '@nestjs/swagger';
import { OperationByPeriodeDto } from '../dtos/operation-by-periode.dto';
import { OperationRespoDto } from '../dtos/responses/operation-respo.dto';
import { DayBilan } from './../dtos/responses/day-bilan.dto';
import { ResultatCompte } from './../dtos/responses/compte-resultat.dto';

@Controller('operations')
@ApiTags("operations")
export class OperationController{
    constructor(private operationService : OperationService){}

    
    @Post('/create')
    async create(@Body() createOperationDto : CreateOperationDto): Promise<Operation>{
        return await this.operationService.create(createOperationDto);
    }
    
    @Get()
    async getAll(): Promise<Operation[]> {
        return await this.operationService.findAll();
    }

    @Get("company/:id/day-summury")
    async getAllForCompany( @Param('id') id :number): Promise<DayBilan> {
        return await this.operationService.getBilanOfDay(id);
    }

    @Get("company/:id")
    async getDayBilanForCompany( @Param('id') id :number): Promise<Operation[]> {
        return await this.operationService.findAllForCompany(id);
    }

    @Post("by-periode")
    async getAllForCompanyByPeriode(@Body() periode: OperationByPeriodeDto): Promise<OperationRespoDto> {
        return await this.operationService.findAllForCompanyByPeriode(periode);
    }

    @Post("compte-de-resultat")
    async getCompteDeResultOfPeriode(@Body() periode: OperationByPeriodeDto): Promise<ResultatCompte> {
        return await this.operationService.getBilanByOperation(periode);
    }

    @Get('/:id')
    async getById(
        @Param('id') id :number
    ): Promise<Operation> {
        return await this.operationService.findOneById(id);
    } 
    
    @Put('update/:id')
    async update(@Param('id') id : number, @Body() body : UpdateOperationDto) {
        return await this.operationService.change(id,body);
    }
  
    @Delete('delete/:id')
    async delete(@Param('id') id : number){
        return await this.operationService.delete(id);
    }

}