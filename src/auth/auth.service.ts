import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from 'src/users/user.service';
import {scrypt as _scrypt} from 'crypto';
import { promisify } from 'util';
import { JwtService } from '@nestjs/jwt';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ) { }

    async login(user:any){
        const payload = { username: user.username, userId: user._id };
        return {
            access_token: this.jwtService.sign(payload)
        }
    }

    async validateUser(username: string, password: string): Promise<any> {
            const user = await this.userService.findOneByUsername(username);
            if (user) { 
                const { password: storedPassword, ...result } = user.toObject();
                if (await this.passwordValidation(password, storedPassword)) {
                    return result;
                }
            }

            // throw new HttpException('User not found!', HttpStatus.BAD_REQUEST);
            return null;
    }

    private async passwordValidation(userPassword: string, storedPassword: string) {
        const password = storedPassword.split('.')[1];
        const salt = storedPassword.split('.')[0];
        const hashedPassword = await scrypt(userPassword, salt, 32) as Buffer;
        return password === hashedPassword.toString('hex');
    }
} 
