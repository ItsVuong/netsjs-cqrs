
import { CreateUserHandler } from "src/users/commands/implements/create-user.handler";
import { GetUsernameHandler } from "./get-user.handler";

export const QueryHandlers = [GetUsernameHandler, CreateUserHandler]