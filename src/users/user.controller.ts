import { Body, Controller, Post } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { CreateUserDto } from "./dto/create-user.dto";
import { CreateUserCommand } from "./commands/create-user.command";

@Controller('/user')
export class UserController{
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus
    ){}

    @Post()
    async createUser(@Body() createUserDto: CreateUserDto){
        return this.commandBus.execute(
            new CreateUserCommand(createUserDto)
        );
    }
}