export class SigninResponseDto {
    status: string;
    access_token: string;
    type: string = "Bearer";
}