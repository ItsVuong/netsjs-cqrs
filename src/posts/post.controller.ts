import { Body, Controller, Get, HttpException, HttpStatus, Param, ParseIntPipe, Patch, Post, Query, Req, UseGuards, ValidationPipe } from "@nestjs/common";
import { CreatePostDto } from "./dtos/create-post.dto";
import { UpdatePostDto } from "./dtos/update-post.dto";
import { JwtAuthGuard } from "src/auth/jwt-auth-guard/jwt-auth.guard";
import { PostService } from "./post.service";
import { ToNumberPipe } from "src/pipes/validation.pipe";
import { Request } from "express";

@Controller('post')
export class PostController {
    constructor(
        private readonly postService: PostService
    ) { }

    @UseGuards(JwtAuthGuard)
    @Post()
    async createPost(
        @Body(new ValidationPipe({ whitelist: true })) bodyObject,
        @Req() req
    ) {
        const createPostDto: CreatePostDto = bodyObject;
        createPostDto.user = req.user.userID;
        return this.postService.createPost(createPostDto);
    }

    @Get()
    async getPost(
        @Query('pageSize', new ToNumberPipe(4)) pageSize: number,
        @Query('page', new ToNumberPipe(1)) page: number
    ) {
        return this.postService.getPost(pageSize, page);
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    async updatePost(
        @Param('id') id: string, 
        @Body(new ValidationPipe({ whitelist: true })) updatePostDto: UpdatePostDto,
        @Req() req
    ) {
        const user = req.user;
        console.log(user)
        if(user){
            const post = await this.postService.findOneByID(id);
            console.log(post);
            if (user.userID.toString() !== post.user.toString()) 
                throw new HttpException('Permision denied!', HttpStatus.FORBIDDEN);
        }
        return this.postService.updatePost(id, updatePostDto);
    }
} 