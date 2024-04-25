import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
require("dotenv").config()

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') { } 