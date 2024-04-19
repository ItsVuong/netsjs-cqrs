
import { IsOptional, IsString } from "class-validator";

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