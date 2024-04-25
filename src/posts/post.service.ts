import { HttpException, Injectable } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { UpdatePostDto } from "./dtos/update-post.dto";
import mongoose from "mongoose";
import { UpdatePostCommand } from "./command/implements/update-post.command";
import { GetAllPostsQuery } from "./query/implements/get-all-posts.query";
import { CreatePostCommand } from "./command/implements/create-post.command";
import { GetPostByIDQuery } from "./query/implements/get-post-by-id.query";

@Injectable()
export class PostService {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus
    ){}

    async createPost(createPostDto)
    {
        return this.commandBus.execute(
            new CreatePostCommand(createPostDto)
        );
    }

    async getPost(pageSize, currentPage)
    {
        console.log(pageSize,currentPage)
        return this.queryBus.execute(
            new GetAllPostsQuery(pageSize, currentPage)
        );
    }

    async updatePost(id: string, updatePostDto: UpdatePostDto){
        const isValid = mongoose.Types.ObjectId.isValid(id);
        if(!isValid) throw new HttpException('Post not found', 404);

        return this.commandBus.execute(
            new UpdatePostCommand(id, updatePostDto)
        );
    }
    
    async findOneByID(id: string){
        return this.queryBus.execute(
            new GetPostByIDQuery(id)
        )
    }
}