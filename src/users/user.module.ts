import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "./schemas/user.schema";
import { CqrsModule } from "@nestjs/cqrs";
import { UserController } from "./user.controller";
import { UserRepository } from "./repository/user.repository";
import { CreateUserHandler } from "./commands/create-user.handler";

@Module({
    imports: [MongooseModule.forFeature([{name: User.name, schema: UserSchema}]),
            CqrsModule],
    controllers: [UserController],
    providers: [UserRepository, CreateUserHandler]
})
export class UserModule{}