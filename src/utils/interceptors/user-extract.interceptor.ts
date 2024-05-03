import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";

@Injectable()
export class UserExtractInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers['authorization'];

    if (token) {
      if(request.user)
      request.body['userID'] = request.user.userID.toString();
    }

    return next.handle();
  }
}