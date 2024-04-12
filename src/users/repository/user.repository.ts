import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "../schemas/user.schema";
import { Model } from "mongoose";
import { CreateUserDto } from "../dto/create-user.dto";

@Injectable()
export class UserRepository{
    constructor(
        @InjectModel(User.name) private userModel: Model<User>){}

        async createUser(createCatDto: CreateUserDto){
            const createdCat = new this.userModel(createCatDto);
            return await createdCat.save();
        }
    
}