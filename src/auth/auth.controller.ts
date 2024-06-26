import { Body, Controller, Post, Request, UseGuards } from "@nestjs/common";
import { LocalAuthGuard } from "./local-auth-guard/local-auth.guard";
import { AuthService } from "./auth.service";

@Controller('/auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}

    @Post()
    @UseGuards(LocalAuthGuard) 
    async userSignin(
        @Request() req
    ){
        return this.authService.login(req.user);
    }
}