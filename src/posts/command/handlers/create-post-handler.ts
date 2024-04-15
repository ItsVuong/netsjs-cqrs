import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CreatePostCommand } from "../implements/create-post.command";
import { PostRepository } from "../../repository/post.repository";

@CommandHandler(CreatePostCommand)
export class CreatePostHandler implements ICommandHandler<CreatePostCommand>{
   constructor(private readonly postRepository: PostRepository){}

    async execute(command: CreatePostCommand){
        return this.postRepository.createPost(command.createPostDto);
    }
}