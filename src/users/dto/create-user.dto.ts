import { Transform, Type } from "class-transformer";
import { IsDate, IsNotEmpty, IsOptional, IsString, Validate } from "class-validator";
import { DateStringValidator } from "src/decorators/DateValidator.decorator";
import { UserExistsValidator } from "src/decorators/UserExistValidator.decorator";

export class CreateUserDto{
    @IsString()
    @IsNotEmpty()
    @Validate(UserExistsValidator)
    username: string;

    // @IsDateString()
    // @Validate(DateStringValidator)
    @IsDate()
    @IsOptional()
    @Type(() => Date)
    dob: Date;
}  