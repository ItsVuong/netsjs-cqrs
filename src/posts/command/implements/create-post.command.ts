import { CreatePostDto } from "src/posts/dtos/create-post.dto";

export class CreatePostCommand {
    constructor(
        public readonly createPostDto: CreatePostDto
    ){}
}