import { IsDate, IsNotEmpty, IsString } from "class-validator";

export class CreateUserDto{
    @IsString()
    @IsNotEmpty()
    username: string;

    @IsDate()
    dob: Date;
}