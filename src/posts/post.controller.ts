import { Body, Controller, Get, Post, ValidationPipe } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { CreatePostDto } from "./dto/create-post.dto";
import { CreatePostCommand } from "./command/implements/create-post.command";
import { GetAllPostsQuery } from "./query/implements/get-all-posts.query";

@Controller('post')
export class PostController {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus
    ) { }

    @Post()
    async createPost(@Body(new ValidationPipe) createPostDto: CreatePostDto)
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
} 