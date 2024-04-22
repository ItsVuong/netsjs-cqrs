import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './users/user.module';
import { PostModule } from './posts/post.module';
import { CommentModule } from './comments/comment.module';
// import { AuthModule } from './auth/auth.module';

@Module({ 
  imports: [
    MongooseModule.forRoot("mongodb://localhost:27017"),
    UserModule,
    PostModule,
    CommentModule,
    // AuthModule 
  ],
  controllers: [],
  providers: [], 
})
export class AppModule {} 


