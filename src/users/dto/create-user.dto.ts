import { IsDate, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateUserDto{
    @IsString()
    @IsNotEmpty()
    username: string;

    @IsDate()
    @IsOptional()
    dob: Date;
}