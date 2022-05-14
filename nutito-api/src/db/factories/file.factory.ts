import { Factory, FactorizedAttrs, Subfactory } from "@jorgebodega/typeorm-seeding"
import { faker } from "@faker-js/faker"
import { Company } from "../../accountancy/entities/company.entity";
import { CompanyCategoryFactory } from "./company-category.factory";
import { AccountFactory } from './account.factory';
import { File } from "../../accountancy/entities/file.entity";
import { UserFactory } from "./user.factory";
import { OperationFactory } from "./operation.factory";

export class FileFactory extends Factory<File> {
    protected entity = File;
    protected attrs: FactorizedAttrs<File> = {
        name: faker.word.noun(),
        location: faker.image.imageUrl(),
        mimetype: faker.helpers.arrayElement(["jpg", "png", "img", "pdf", "docx", "odt"]),
        entity_id: faker.datatype.number(),
        operation: new Subfactory(OperationFactory),
        user: new Subfactory(UserFactory)
    }
}