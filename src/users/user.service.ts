import { HttpStatus, Injectable } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { findUserByUsernameCommand } from "./queries/impelments/find-user-by-username.query";
import { randomBytes, scrypt as _scrypt } from "crypto"
import { CreateUserDto } from "./dtos/create-user.dto";
import { CreateUserCommand } from "./commands/handlers/create-user.command";
import { promisify } from "util";
import { User } from "./schemas/user.schema";
import { HttpErrorByCode } from "@nestjs/common/utils/http-error-by-code.util";

const scrypt = promisify(_scrypt);

@Injectable()
export class UserService {
    constructor(private readonly commandBus: CommandBus, private readonly querybus: QueryBus) { }
    

    async findOneByUsername(username: string): Promise<User> {
        return this.querybus.execute(new findUserByUsernameCommand(username));
    }

    async createUser(createUserDto: CreateUserDto){
        const password = createUserDto.password;
        return this.commandBus.execute(new CreateUserCommand({ ...createUserDto, password: await this.encryptPassword(password) }))
    }

    async userSignin(username: string, password: string) {
        const user = await this.querybus.execute(new findUserByUsernameCommand(username));
        if(!user || user.username === undefined) throw HttpStatus.BAD_REQUEST;

        if(this.passwordValidation(password)){
            console.log("success");
        }
    }

    async passwordValidation(userPassword: string){
        const password = userPassword.split('.')[1];
        const salt = userPassword.split('.')[0];
        const hashedPassword = await scrypt(password, salt, 32) as Buffer;
        return userPassword === hashedPassword.toString('hex');
    }

    async encryptPassword(password: string){
        const salt = randomBytes(8).toString('hex');
        const hashedPassword = await scrypt(password, salt, 32) as Buffer;
        const result = salt + '.' + hashedPassword.toString('hex');
        return result;
    }
    // createUser(createUserDto: CreateUserDto) {
    //     const salt = randomBytes(8).toString('hex');
    //     scrypt
    //         (createUserDto.password, salt, 32,
    //             (err, derivedKey) => {
    //                 if (err) throw err;
    //                 const hashedPassword = salt + '.' + derivedKey.toString('hex');
    //                 return this.commandBus.execute(new CreateUserCommand({ ...createUserDto, password: hashedPassword }))
    //             });
    // }
}