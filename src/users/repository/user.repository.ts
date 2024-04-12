import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "../schemas/user.schema";
import { Model } from "mongoose";

@Injectable()
export class UserRepository{
    constructor(
        @InjectModel(User.name) private UserModel: Model<User>
    ){}
}