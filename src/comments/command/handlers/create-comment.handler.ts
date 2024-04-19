import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CommentRepository } from "src/comments/repository/comment.repository";
import { CreateCommentCommand } from "../implements/create-comment.command";

@CommandHandler(CreateCommentCommand)
export class CreateCommentHandler implements ICommandHandler<CreateCommentCommand>{
    constructor(private readonly commentRepository: CommentRepository){}

    execute(command: CreateCommentCommand): Promise<any> {
        const createCommentDto = command.createCommentDto;
        return this.commentRepository.createComment(createCommentDto);
    }

}