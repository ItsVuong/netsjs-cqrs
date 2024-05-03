import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreatePostDto } from "src/posts/dtos/create-post.dto";
import { Post } from "../schemas/post.schema";

@Injectable()
export class PostRepository {
    constructor(
        @InjectModel(Post.name) private postModel: Model<Post>) { }

    async createPost(createPostDto: CreatePostDto) {
        const createdPost = new this.postModel(createPostDto);
        return createdPost.save();
    }

    async getAllPosts(pageSize: number, currentPage: number) {
        const count = await this.postModel.countDocuments({});
        const pages = Math.round(count / pageSize);

        if(currentPage >= pages){currentPage = pages}
        if(currentPage <= 0){currentPage = 1} 

        const posts = this.postModel.find( 
            {}, null,
            { sort: {_id: 1}, limit: pageSize, skip: (currentPage - 1) * pageSize  }
        ).populate('userID');

        return posts;
    }

    async getPostByID(id: string){
        return this.postModel.findOne({_id: id})
    }

    async updatePost(id, UpdatePostDto) {
        return this.postModel.findByIdAndUpdate(id, UpdatePostDto, { new: true })
    }
}