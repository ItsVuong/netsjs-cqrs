import { Optional } from "@nestjs/common";
import { SchemaFactory } from "@nestjs/mongoose";
import { IsNotEmpty, IsString, Validate, ValidateNested } from "class-validator";
import { UserExistsValidator } from "src/utils/decorators/UserExistValidator.decorator";

export class CreatePostDto {
    @IsNotEmpty()
    title: string;
    
    @IsNotEmpty()
    content: string;

    @Optional()
    // @IsString({each: true})
    images: string[];

    @Optional()
    createdAt: Date;

    @Optional()
    updatedAt: Date;

    @IsNotEmpty()
    userID: string;
}
export const UserSchema = SchemaFactory.createForClass(CreatePostDto);    