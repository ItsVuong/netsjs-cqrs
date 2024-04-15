import { CreatePostDto } from "src/posts/dto/create-post.dto";

export class CreatePostCommand {
    constructor(
        public readonly createPostDto: CreatePostDto
    ){}
}