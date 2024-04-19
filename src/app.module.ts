import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './users/user.module';
import { PostModule } from './posts/post.module';
import { CommentModule } from './comments/comment.module';

@Module({ 
  imports: [
    MongooseModule.forRoot("mongodb://localhost:27017"),
    UserModule,
    PostModule,
    CommentModule 
  ],
  controllers: [],
  providers: [], 
})
export class AppModule {} 


