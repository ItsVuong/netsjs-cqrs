import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { findUserByUsernameCommand } from "./queries/impelments/find-user-by-username.query";
import { randomBytes, scrypt as _scrypt } from "crypto"
import { CreateUserDto } from "./dtos/create-user.dto";
import { CreateUserCommand } from "./commands/handlers/create-user.command";
import { promisify } from "util";

const scrypt = promisify(_scrypt);

@Injectable()
export class UserService {
    constructor(private readonly commandBus: CommandBus, private readonly querybus: QueryBus) { }


    async findOneByUsername(username: string): Promise<any> {
        const user = this.querybus.execute(new findUserByUsernameCommand(username));
        if (!user) throw new HttpException('User not found!', HttpStatus.BAD_REQUEST);
        return user;
    }

    async createUser(createUserDto: CreateUserDto) {
        const password = createUserDto.password;
        return this.commandBus.execute(new CreateUserCommand({ ...createUserDto, password: await this.encryptPassword(password) }));
    }

    private async encryptPassword(password: string) {
        const salt = randomBytes(8).toString('hex');
        const hashedPassword = await scrypt(password, salt, 32) as Buffer;
        const result = salt + '.' + hashedPassword.toString('hex');
        return result;
    }
}