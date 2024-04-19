import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { CommentRepository } from "src/comments/repository/comment.repository";
import { GetCommentQuery } from "../implements/get-comment.query";

@QueryHandler(GetCommentQuery)
export class GetCommandHandler implements IQueryHandler<GetCommentQuery>{
    constructor(private readonly commentRepository: CommentRepository){}

    execute(query: GetCommentQuery): Promise<any> {
        const comment = this.commentRepository.getCommentByPost(query.postID);
        return comment;
    }

}