// import { Injectable } from '@nestjs/common';
// import { CommandBus, QueryBus } from '@nestjs/cqrs';
// import { GetUsername } from 'src/users/queries/impelments/find-user-by-username.query';

// @Injectable()
// export class AuthService {
//     constructor(private queryBus: QueryBus){}

//     async validateUser(username: string, pass: string): Promise<any> {
//       const user = await this.queryBus.execute(new GetUsername(username));
//       if(user && user.password === pass){
//         const {password, ...result} = user;
//         return result;
//       }
//       return null;
//     }
// } 
