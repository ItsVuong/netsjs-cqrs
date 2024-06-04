import { AggregateRoot } from "@nestjs/cqrs";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { Post } from "src/posts/schemas/post.schema";
import { User } from "src/users/schemas/user.schema";

@Schema()
export class Comment extends AggregateRoot{
    constructor(){
        super();
    }
 
    @Prop({required: true})
    content: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
    userID: User;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true })
    postID: Post;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Comment', required: false })
    parentID: Comment; 

    @Prop()
    updatedAt: Date;
 
    @Prop()
    createdAt: Date;
}
export const CommentSchema = SchemaFactory.createForClass(Comment);