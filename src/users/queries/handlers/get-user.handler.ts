import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetUsername } from "../impelments/get-user.query";
import { UserRepository } from "src/users/repository/user.repository";

@QueryHandler(GetUsername)
export class GetUsernameHandler implements IQueryHandler<GetUsername>{
    constructor(public readonly userRepository: UserRepository) {}

    execute(query: GetUsername): Promise<any> {
        return this.userRepository.getUsername(query.username) 
    }

}