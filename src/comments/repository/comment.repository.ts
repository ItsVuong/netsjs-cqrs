import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Comment } from "../schemas/comment.schema";
import { Model } from "mongoose";
import { CreateCommentDto } from "../dtos/create-comment.dto";

@Injectable()
export class CommentRepository{
    constructor(
        @InjectModel(Comment.name) private commentModel: Model<Comment>
    ){}

    async createComment(createCommentDto : CreateCommentDto): Promise<Comment>{
        const createComment = new this.commentModel(createCommentDto);
        return createComment.save();
    }

    async getCommentByPost(postID){
        console.log(postID)
        return this.commentModel.find({"postID": postID})
    }
}