import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "./schemas/user.schema";
import { CqrsModule } from "@nestjs/cqrs";
import { UserController } from "./user.controller";
import { UserRepository } from "./repository/user.repository";
import { UserExistsValidator } from "src/utils/decorators/UserExistValidator.decorator";
import { DateStringValidator } from "src/utils/decorators/DateValidator.decorator";
import { CommandHandlers } from "./commands/handlers";
import { QueryHandlers } from "./queries/handlers";
import { UserService } from "./user.service";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
        CqrsModule,
    ],
    controllers: [UserController],
    providers: [UserRepository, UserExistsValidator, DateStringValidator,
        UserService,
        ...CommandHandlers,
        ...QueryHandlers
    ],
    exports: [UserService]
})
export class UserModule { }