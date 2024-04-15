import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CreateUserCommand } from "../handlers/create-user.command";
import { UserRepository } from "../../repository/user.repository";

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand>{
   constructor(private readonly userRepository: UserRepository){}

    async execute(command: CreateUserCommand){
        return this.userRepository.createUser(command.createUserDto);
    }
}