import { SetMetadata } from "@nestjs/common";
import { Authorisation } from "../types/authorisation.type";

export const REQUIRED_AUTHORISATIONS = 'requiredAuthorisations';
export const CheckAuthorisations = (...authorisations: Authorisation[]) => SetMetadata(REQUIRED_AUTHORISATIONS, authorisations);