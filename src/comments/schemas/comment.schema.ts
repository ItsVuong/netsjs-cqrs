import { AggregateRoot } from "@nestjs/cqrs";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";

@Schema()
export class Comment extends AggregateRoot{
    constructor(){
        super();
    }
 
    @Prop({required: true})
    content: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
    userID: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true })
    postID: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Comment', required: false })
    parentID: string;

    @Prop()
    updatedAt: Date;
 
    @Prop()
    createdAt: Date;
}
export const CommentSchema = SchemaFactory.createForClass(Comment);