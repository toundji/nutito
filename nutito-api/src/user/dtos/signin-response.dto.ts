export class SigninResponseDto {
    status: string;
    access_token: string;
    user_data: any;
    type: string = "Bearer";
}