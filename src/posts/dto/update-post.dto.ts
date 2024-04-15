import { Optional } from "@nestjs/common";
import { SchemaFactory } from "@nestjs/mongoose";
import { IsOptional, IsString, Validate, ValidateNested } from "class-validator";

export class UpdatePostDto {
    @IsOptional()
    title: string;
    
    @IsOptional()
    content: string;

    @IsOptional()
    @IsString({each: true})
    images: string[];

    @IsOptional()
    updatedAt: Date;
}