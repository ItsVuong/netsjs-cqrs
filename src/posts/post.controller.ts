import { Body, Controller, Get, HttpException, Param, Patch, Post, ValidationPipe } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { CreatePostDto } from "./dtos/create-post.dto";
import { CreatePostCommand } from "./command/implements/create-post.command";
import { GetAllPostsQuery } from "./query/implements/get-all-posts.query";
import { UpdatePostDto } from "./dtos/update-post.dto";
import { UpdatePostCommand } from "./command/implements/update-post.command";
import mongoose from "mongoose";

@Controller('post')
export class PostController {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus
    ) { }

    @Post()
    async createPost(@Body(new ValidationPipe({whitelist: true})) createPostDto: CreatePostDto)
    {
        return this.commandBus.execute(
            new CreatePostCommand(createPostDto)
        );
    }

    @Get()
    async getPost()
    {
        return this.queryBus.execute(
            new GetAllPostsQuery()
        );
    }

    @Patch(':id')
    async updatePost(@Param('id') id: string, @Body(new ValidationPipe({whitelist: true})) updatePostDto: UpdatePostDto){
        const isValid = mongoose.Types.ObjectId.isValid(id);
        if(!isValid) throw new HttpException('Post not found', 404);

        return this.commandBus.execute(
            new UpdatePostCommand(id, updatePostDto)
        );
    } 
} 