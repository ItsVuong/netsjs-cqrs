import { ApiProperty } from "@nestjs/swagger";
import { Transform, Type } from "class-transformer";
import { IsDate, IsNotEmpty, IsOptional, IsString, Validate } from "class-validator";
import { DateStringValidator, validateDateString } from "src/decorators/DateValidator.decorator";
import { UserExistsValidator } from "src/decorators/UserExistValidator.decorator";

export class CreateUserDto {
    @ApiProperty({
        description: "Unique identifier of an user.",
        example: "FlyingRacoon123"
    })

    @IsString()
    @IsNotEmpty()
    @Validate(UserExistsValidator)
    username: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @ApiProperty({
        description: "Date of birth.",
        example: "2010-10-10"
    })
    // @Validate(DateStringValidator)
    @validateDateString()
    @IsOptional()
    dob: Date;
}  