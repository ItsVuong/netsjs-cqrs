import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Comment } from "../schemas/comment.schema";
import mongoose, { Model } from "mongoose";
import { CreateCommentDto } from "../dtos/create-comment.dto";

@Injectable()
export class CommentRepository {
    constructor(
        @InjectModel(Comment.name) private commentModel: Model<Comment>
    ) { }

    async createComment(createCommentDto: CreateCommentDto): Promise<Comment> {
        const createComment = new this.commentModel(createCommentDto);
        return createComment.save();
    }

    async getCommentByPost(postID) {
        console.log(postID)
        return this.commentModel.find({ "postID": postID })
    }

    async deleteComment(commentId: string) {
        
        const idOjbect = new mongoose.Types.ObjectId(commentId);

        const pipeline =
            [
                { $match: {  _id: idOjbect}},
                {
                    $lookup: {
                        from: "comments",
                        localField: "_id",
                        foreignField: "parentID",
                        as: "children",
                    },
                },
            ];

            const comment = await this.commentModel.aggregate(pipeline);
            for(const children of comment[0]?.children){
                console.log('deleting child comment: ', children?.content)
                await this.deleteComment(children._id);
            }
            console.log('deleting comment: ', idOjbect)
            return comment;
    }
}