import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "../schemas/user.schema";
import { Model } from "mongoose";
import { CreateUserDto } from "../dto/create-user.dto";

@Injectable()
export class UserRepository{
    constructor(
        @InjectModel(User.name) private userModel: Model<User>){}

        async createUser(createdPostDto: CreateUserDto){
            const createdPost = new this.userModel(createdPostDto);
            return await createdPost.save();
        }

        async getUsername(username: string){
            return await this.userModel.find({username: username}); 
        }
    
}