import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetAllPostsQuery } from "../implements/get-all-posts.query";
import { PostRepository } from "../../repository/post.repository";

@QueryHandler(GetAllPostsQuery)
export class GetAllPostsHandler implements IQueryHandler<GetAllPostsQuery>{
    constructor(
        private readonly postRepository: PostRepository,
    ){}
    
    execute(getAllPostQuery: GetAllPostsQuery) {
        return this.postRepository.getAllPosts(getAllPostQuery.pageSize, getAllPostQuery.currentPage);
    }

}