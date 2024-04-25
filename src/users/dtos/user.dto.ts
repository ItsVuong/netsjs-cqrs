import { ApiProperty } from "@nestjs/swagger";
import { Expose, Transform, Type } from "class-transformer";


export class UserDto {
    @Expose()
    username: string;

    @ApiProperty({
        description: "Date of birth.",
        example: "2010-10-10"
    })

    @Expose()
    dob: Date;
}  