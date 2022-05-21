import { BadRequestException, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Account } from '../entities/account.entity';
import { CreateAccountDto } from '../dtos/create-account.dto';
import { UpdateAccountDto } from "../dtos/update-account.dto";

export class AccountService {

    constructor(
        @InjectRepository(Account)
        private readonly accountsRepository: Repository<Account>
    ) {}

    findAll(): Promise<Account[]> {
        return this.accountsRepository.find({ relations: ["company"] });
    }

    async findOneById(accountId: number): Promise<Account> {
        const account = await this.accountsRepository.findOneOrFail({ where: { id: accountId }, relations: ["company"] }).catch(
            (error) => {
                throw new NotFoundException({ error: `Account matching id ${accountId} has not been found` });
            }
        );
        return account;
    }

    async findOneBySlug(slug: string): Promise<Account> {
        const account = await this.accountsRepository.findOneOrFail({ where: { slug: slug } }).catch(
          (error) => {
            throw new NotFoundException(`Account matching slug ${slug} has not been found`);
          }
        );
        return account;
    }


    async create(createAccountDto: CreateAccountDto): Promise<Account> {
        let account = new Account();
        Object.keys(createAccountDto).forEach(
          attribute => account[attribute] = createAccountDto[attribute]
        );
        const newAccount = this.accountsRepository.create(account);
        let accountObject = this.accountsRepository.save(newAccount).catch(
          (error) => {
            throw new BadRequestException(`Account already registered`);
          }
        );
        return accountObject;
      }

    async update(accountId: number, updateAccountDto: UpdateAccountDto): Promise<Account> {
      let account = await this.findOneById(accountId);
      Object.keys(updateAccountDto).forEach(
        attribute => account[attribute] = updateAccountDto[attribute]
      );
      let updated = await account.save();
      return updated;
    }

    async delete(accountId: number): Promise<any> {
      let account = await this.findOneById(accountId);
      Account.softRemove(account);
      return;
    }

}