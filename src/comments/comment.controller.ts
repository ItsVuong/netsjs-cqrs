import { Controller, Delete, Get, HttpException, Param, Post, UseGuards } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { CreateCommentDto } from "./dtos/create-comment.dto";
import mongoose from "mongoose";
import { CreateCommentCommand } from "./command/implements/create-comment.command";
import { GetCommentQuery } from "./queries/implements/get-comment.query";
import { JwtAuthGuard } from "src/auth/jwt-auth-guard/jwt-auth.guard";
import { Comment } from "./decorators/comment.decorator"; 
import { DeleteCommentCommand } from "./command/implements/delete-comment.command";

@Controller('post/:postid/comments')
export class CommentController{
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus
    ){ }

    @Get()
    async getCommentByPost(@Param('postid') postID: string){
        const isValid = mongoose.Types.ObjectId.isValid(postID);
        if(!isValid) throw new HttpException('Post not found', 404);

        return this.queryBus.execute(
            new GetCommentQuery(postID)
        );
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async createComment(
        @Comment() createCommentDto: CreateCommentDto,
    ){
        const isPostValid = mongoose.Types.ObjectId.isValid(createCommentDto.postID);
        if(!isPostValid) throw new HttpException('Post not found', 404);
        const isCommentValid = mongoose.Types.ObjectId.isValid(createCommentDto.parentID);
        if(!isCommentValid) throw new HttpException('Comment not found', 404);
        
        return this.commandBus.execute(
            new CreateCommentCommand(createCommentDto)
        );
    }

    @Delete('/:commentid')
    async deleteComment(
        @Param('commentid') commentId: string
    ){
        const isPostValid = mongoose.Types.ObjectId.isValid(commentId);
        if(!isPostValid) throw new HttpException('Invalid comment id', 404);

        return this.commandBus.execute(
            new DeleteCommentCommand(commentId)
        );
    }
}
