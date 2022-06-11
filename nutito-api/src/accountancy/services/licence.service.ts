/* eslint-disable prettier/prettier */
import { UpdateLicenceDto } from './../dtos/update-licence.dto';
import { CompanyService } from './company.service';
import { CreateLicenceDto } from './../dtos/create-licence.dto';
import { DeleteResult } from 'typeorm';
import { Licence } from './../entities/licence.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { uuid, addMonths } from '../../utilities/helpers/functions.helper';
import { LicenceTypeEnum } from '../../utilities/enums/licence-type.enum';
import { Company } from '../entities/company.entity';
@Injectable()
export class LicenceService {
  constructor(
    @InjectRepository(Licence)
    private readonly licenceRepository: Repository<Licence>,
    private readonly companySerice: CompanyService,
  ) {}

  async findAll(): Promise<Licence[]> {
    return await this.licenceRepository.find();
  }

  async findOnById(id: number): Promise<any> {
    const licence = await this.licenceRepository
      .findOneOrFail({ where: { id: id } })
      .catch((error) => {
        throw new NotFoundException(`Licence with id ${id} is not found`);
      });
    return licence;
  }

  async delete(id: number): Promise<DeleteResult> {
    return await this.licenceRepository.delete(id);
  }

  async create(createLicenceDto: CreateLicenceDto): Promise<Licence> {
    const PRICE_PER_MONTH: number = 1000;
    const newLicence = new Licence();
    const company = await this.companySerice.findOneById(
      createLicenceDto.companyId,
    );
    newLicence.company = company;
    newLicence.code = uuid();
    newLicence.expiryDate = addMonths(new Date(), createLicenceDto.monthsNumber);
    newLicence.amount = PRICE_PER_MONTH * createLicenceDto.monthsNumber;
   const licence = await  newLicence.save();
   company.licence = licence;
   Company.save(company);
   licence.company.licence = null;
    return licence;
  }

  async update(
    updateLicenceDto: UpdateLicenceDto,
    id: number,
  ): Promise<Licence> {
    const licence = await this.findOnById(id);

    licence.company.id = updateLicenceDto.company_id
      ? updateLicenceDto.company_id
      : undefined;

    return await this.licenceRepository.save(licence);
  }
}
