import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './users/user.module';
import { PostModule } from './posts/post.module';

@Module({ 
  imports: [
    MongooseModule.forRoot("mongodb://localhost:27017"),
    UserModule,
    PostModule 
  ],
  controllers: [],
  providers: [], 
})
export class AppModule {} 


