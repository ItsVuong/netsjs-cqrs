import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CommentRepository } from "src/comments/repository/comment.repository";
import { DeleteCommentCommand } from "../implements/delete-comment.command";

@CommandHandler(DeleteCommentCommand)
export class DeleteCommentHandler implements ICommandHandler<DeleteCommentCommand>{
    constructor(private readonly commentRepository: CommentRepository){}

    execute(command: DeleteCommentCommand): Promise<any> {
        const commentId = command.commentId;
        return this.commentRepository.deleteComment(commentId);
    }

}