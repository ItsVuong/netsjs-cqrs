import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";

@Schema()
export class User{

    @ApiProperty({description: "When user is created"})
    @Prop({required:true, unique:true})
    username: string;

    @Prop()
    @ApiProperty({description: "When user is created"}) 
    dob: Date;
}
export const UserSchema = SchemaFactory.createForClass(User);    