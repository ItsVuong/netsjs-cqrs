import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreatePostDto } from "src/posts/dto/create-post.dto";
import { Post } from "../schemas/post.schema";

@Injectable()
export class PostRepository {
    constructor(
        @InjectModel(Post.name) private postModel: Model<Post>) { }

    async createPost(createPostDto: CreatePostDto) {
        const createdPost = new this.postModel(createPostDto);
        return await createdPost.save();
    }

    async getAllPosts(){
        return await this.postModel.find({});
    }

}