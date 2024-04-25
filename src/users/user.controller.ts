import { Body, Controller, Get, Param, Post, UseGuards, UseInterceptors, ValidationPipe } from "@nestjs/common";
import { CreateUserDto } from "./dtos/create-user.dto";
import { ApiBadRequestResponse, ApiCreatedResponse } from "@nestjs/swagger";
import { User } from "./schemas/user.schema";
import { UserService } from "./user.service";
import { UserDto } from "./dtos/user.dto";
import { Serialize, SerializeInterceptor } from "src/interceptors/serialize.interceptor";


@Controller('/user')
export class UserController{
    constructor(
        private readonly userService: UserService,
    ){}

    @ApiCreatedResponse({
        description: "Return user object as created.",
        type: User
    })
    @ApiBadRequestResponse({
        description: "Username has already been used or date of birth is invalid."
    })

    @Post()
    async createUser(@Body(new ValidationPipe({ transform: true })) createUserDto: CreateUserDto)
    {
        return this.userService.createUser(createUserDto)
    }
    
    // @UseInterceptors(new SerializeInterceptor(UserDto))
    @Serialize(UserDto)
    @Get(':username')
    async getUser(@Param('username') username: string)
    {
        const returnUserDto: UserDto = await this.userService.findOneByUsername(username);
        return returnUserDto;
    }
}