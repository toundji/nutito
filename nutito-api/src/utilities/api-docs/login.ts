import {
    SwaggerProtectLogInDto,
    SwaggerLoginInterface,
  } from '@femike/swagger-protect'
import { v4 as uuid } from 'uuid'

export class SwaggerDocLogin implements SwaggerLoginInterface {

    async execute({
        login,
        password,
    }: SwaggerProtectLogInDto): Promise<{ token: string }> {
        return login === 'rotman' && password === 'rotmansquare'
        ? { token: uuid() }
        : { token: '' }
    }
}