import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { findUserByUsernameCommand } from "../impelments/find-user-by-username.query";
import { UserRepository } from "src/users/repository/user.repository";
import { User } from "src/users/schemas/user.schema";

@QueryHandler(findUserByUsernameCommand)
export class GetUsernameHandler implements IQueryHandler<findUserByUsernameCommand>{
    constructor(public readonly userRepository: UserRepository) {}

    execute(query: findUserByUsernameCommand): Promise<User> {
        return this.userRepository.findOneByUsername(query.username) 
    }

}