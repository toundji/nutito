import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport"
import { Strategy } from "passport-local";
import { AuthenticationService } from '../services/authentication.service';

@Injectable()
export class LocalStrategyUsingPhone extends PassportStrategy(Strategy) {
    constructor(private readonly authservice: AuthenticationService) {
        super({
            usernameField: 'phone'
        });
    }

    async validate(phone: string, password: string): Promise<any> {
        const user = await this.authservice.validateUserWithPhone(phone, password);
        return user;
    }
}

@Injectable()
export class LocalStrategyUsingEmail extends PassportStrategy(Strategy) {
    constructor(private readonly authservice: AuthenticationService) {
        super({
            usernameField: 'email' || 'phone'
        });
    }

    async validate(email: string, password: string): Promise<any> {
        const user = await this.authservice.validateUserWithEmail(email, password);
        return user;
    }
}