import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { UpdatePostCommand } from "../implements/update-post.command";
import { PostRepository } from "src/posts/repository/post.repository";

@CommandHandler(UpdatePostCommand)
export class UpdatePostHandler implements ICommandHandler{
    constructor(private readonly postRepository: PostRepository){}

    execute(command: UpdatePostCommand) {
        const updateDto = command.updatePostDto;
        updateDto.updatedAt = new Date;
        return this.postRepository.updatePost(command.id, updateDto);
    }

}