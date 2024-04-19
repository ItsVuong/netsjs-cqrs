import { Body, Controller, Get, HttpException, Param, Post } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { CreateCommentDto } from "./dtos/create-comment.dto";
import mongoose from "mongoose";
import { CreateCommentCommand } from "./command/implements/create-comment.command";
import { GetCommentQuery } from "./queries/implements/get-comment.query";

@Controller('/:id/comments')
export class CommentController{
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus
    ){ }

    @Get()
    async getCommentByPost(@Param('id') postID: string){
        const isValid = mongoose.Types.ObjectId.isValid(postID);
        if(!isValid) throw new HttpException('Post not found', 404);

        return this.queryBus.execute(
            new GetCommentQuery(postID)
        )
    }

    @Post()
    async createComment(
        @Body() createCommentDto: CreateCommentDto,
        @Param('id') id: string
    ){
        const isValid = mongoose.Types.ObjectId.isValid(id);
        if(!isValid) throw new HttpException('Post not found', 404);

        createCommentDto.postID = id;
        return this.commandBus.execute(
            new CreateCommentCommand(createCommentDto)
        )
    }
}
