import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './users/user.module';

@Module({ 
  imports: [
    ConfigModule.forRoot(), MongooseModule.forRoot("mongodb+srv://itsvuong0806:NjSq5MRwyuJPHRGK@demodb.gpm9mdf.mongodb.net/"),
    UserModule 
  ],
  controllers: [],
  providers: [], 
})
export class AppModule {} 


