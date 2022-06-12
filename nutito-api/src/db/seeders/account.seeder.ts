/* eslint-disable prettier/prettier */
import { Seeder } from '@jorgebodega/typeorm-seeding';
import { Connection } from 'typeorm';
import { AccountFactory } from '../factories/account.factory';

export class AccountSeeder extends Seeder {
  async run(connection: Connection) {
    await new AccountFactory().createMany(60);
  }
}
