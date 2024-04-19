import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateCommentDto{
    @IsString()
    @IsNotEmpty()
    cotent: string;

    @IsNotEmpty()
    userID: string;

    @IsNotEmpty()
    postID: string;
    
    @IsOptional()
    parentID: string;
}