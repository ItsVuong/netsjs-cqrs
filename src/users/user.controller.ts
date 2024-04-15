import { Body, Controller, Get, Param, Post, ValidationPipe } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { CreateUserDto } from "./dto/create-user.dto";
import { CreateUserCommand } from "./commands/handlers/create-user.command";
import { GetUsername } from "./queries/impelments/get-user.query";

@Controller('/user')
export class UserController{
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus
    ){}

    @Post()
    async createUser(@Body(new ValidationPipe({transform: true}),) createUserDto: CreateUserDto)
    {
        const date = createUserDto.dob;

        return this.commandBus.execute(
            new CreateUserCommand(createUserDto)
        );
    }

    @Get(':username')
    async getUser(@Param('username') id: string)
    {
        return this.queryBus.execute(
            new GetUsername(id)
        );
    }
}