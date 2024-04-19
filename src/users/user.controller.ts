import { Body, Controller, Get, Param, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { CreateUserDto } from "./dtos/create-user.dto";
import { CreateUserCommand } from "./commands/handlers/create-user.command";
import { GetUsername } from "./queries/impelments/get-user.query";
import { ApiBadRequestResponse, ApiCreatedResponse } from "@nestjs/swagger";
import { User } from "./schemas/user.schema";

@Controller('/user')
export class UserController{
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus
    ){}

    @Post()
    @ApiCreatedResponse({
        description: "Return user object as created.",
        type: User
    })
    @ApiBadRequestResponse({
        description: "Username has already been used or date of birth is invalid."
    })
    // @UsePipes(new DateTransformPipe())
    async createUser(@Body(new ValidationPipe({transform: true})) createUserDto: CreateUserDto)
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