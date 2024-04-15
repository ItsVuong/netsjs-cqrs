import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetAllPostsQuery } from "../implements/get-all-posts.query";
import { PostRepository } from "../../repository/post.repository";

@QueryHandler(GetAllPostsQuery)
export class GetAllPostsHandler implements IQueryHandler<GetAllPostsQuery>{
    constructor(public readonly postRepository: PostRepository){}
    
    execute() {
        return this.postRepository.getAllPosts();
    }

}