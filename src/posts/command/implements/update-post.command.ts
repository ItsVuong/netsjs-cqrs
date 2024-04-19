import mongoose from "mongoose";
import { UpdatePostDto } from "src/posts/dtos/update-post.dto";

export class UpdatePostCommand{
    constructor (
        public readonly id: string,
        public readonly updatePostDto: UpdatePostDto
    ){}
}