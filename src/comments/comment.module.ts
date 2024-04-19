import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { MongooseModule } from "@nestjs/mongoose";
import { Comment, CommentSchema } from "./schemas/comment.schema";
import { CommentController } from "./comment.controller";
import { CommentRepository } from "./repository/comment.repository";
import { CommandHandlers } from "./command/handlers";
import { QueryHandlers } from "./queries/handlers";

@Module({
    imports: [
        MongooseModule.forFeature([{name: Comment.name, schema: CommentSchema}]),
        CqrsModule
    ],
    controllers: [CommentController],
    providers: [CommentRepository, ...CommandHandlers, ...QueryHandlers]
}) 
export class CommentModule { }