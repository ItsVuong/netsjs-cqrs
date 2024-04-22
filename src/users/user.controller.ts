import { Body, Controller, Get, Param, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { CreateUserDto } from "./dtos/create-user.dto";
import { CreateUserCommand } from "./commands/handlers/create-user.command";
import { ApiBadRequestResponse, ApiCreatedResponse } from "@nestjs/swagger";
import { User } from "./schemas/user.schema";
import { UserService } from "./user.service";

@Controller('/user')
export class UserController{
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus,
        private readonly userService: UserService
    ){}

    @Post()
    @ApiCreatedResponse({
        description: "Return user object as created.",
        type: User
    })
    @ApiBadRequestResponse({
        description: "Username has already been used or date of birth is invalid."
    })
    async createUser(@Body(new ValidationPipe({transform: true})) createUserDto: CreateUserDto)
    {
        return this.userService.createUser(createUserDto)
    }

    @Get(':username')
    async getUser(@Param('username') username: string)
    {
        return this.userService.findOneByUsername(username);
    }
}