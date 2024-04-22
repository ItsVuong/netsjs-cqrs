import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class User{

   
    @Prop({required:true, unique:true})
    username: string;

    @Prop()
    password: string;

    @Prop()
    dob: Date;
}
export const UserSchema = SchemaFactory.createForClass(User);    