import { CreateCommentDto } from "../../dtos/create-comment.dto";

export class CreateCommentCommand {
    constructor(
        public readonly createCommentDto: CreateCommentDto
    ){}
}