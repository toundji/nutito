import { Factory, FactorizedAttrs, Subfactory } from "@jorgebodega/typeorm-seeding"
import { faker } from "@faker-js/faker"
import { Company } from "../../accountancy/entities/company.entity";
import { CompanyCategoryFactory } from "./company-category.factory";
import { AccountFactory } from './account.factory';
import { Fichier } from "../../accountancy/entities/fichier.entity";
import { UserFactory } from "./user.factory";

export class FileFactory extends Factory<Fichier> {
    protected entity = Fichier;
    protected attrs: FactorizedAttrs<Fichier> = {
        name: faker.word.noun(),
        location: faker.image.imageUrl(),
        mimetype: faker.helpers.arrayElement(["jpg", "png", "img", "pdf", "docx", "odt"]),
        entity_name: faker.datatype.string(),
    }
}