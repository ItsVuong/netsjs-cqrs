import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './users/user.module';
import { PostModule } from './posts/post.module';
import { CommentModule } from './comments/comment.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';

@Module({ 
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_URL),
    UserModule,
    PostModule,
    CommentModule,
    AuthModule 
  ],
  controllers: [],
  providers: [], 
})
export class AppModule {} 


