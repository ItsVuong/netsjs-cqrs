import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "./schemas/user.schema";
import { CqrsModule } from "@nestjs/cqrs";
import { UserController } from "./user.controller";
import { UserRepository } from "./repository/user.repository";
import { UserExistsValidator } from "src/decorators/UserExistValidator.decorator";
import { DateStringValidator } from "src/decorators/DateValidator.decorator";
import { CommandHandlers } from "./commands/handlers";
import { QueryHandlers } from "./queries/handlers";

@Module({
    imports: [MongooseModule.forFeature([{name: User.name, schema: UserSchema}]),
            CqrsModule],
    controllers: [UserController],
    providers: [UserRepository, UserExistsValidator, DateStringValidator,
        ...CommandHandlers,
        ...QueryHandlers
    ]
})
export class UserModule{}