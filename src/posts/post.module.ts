import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { CqrsModule } from "@nestjs/cqrs";

import { UserExistsValidator } from "src/decorators/UserExistValidator.decorator";
import { Post, PostSchema } from "./schemas/post.schema";
import { PostController } from "./post.controller";
import { PostRepository } from "./repository/post.repository";
import { CommandHadlers } from "./command/handlers";
import { QueryHandler } from "./query/handlers";
import { PostService } from "./post.service";

@Module({
    imports: [MongooseModule.forFeature([{name: Post.name, schema: PostSchema}]),
            CqrsModule],
    controllers: [PostController],
    providers: [
        PostRepository, 
        UserExistsValidator, 
        PostService,
        ...QueryHandler,
        ...CommandHadlers
    ]
})
export class PostModule{} 