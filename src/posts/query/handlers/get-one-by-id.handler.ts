import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetAllPostsQuery } from "../implements/get-all-posts.query";
import { PostRepository } from "../../repository/post.repository";
import { GetPostByIDQuery } from "../implements/get-post-by-id.query";

@QueryHandler(GetPostByIDQuery)
export class GetPostByIDHandler implements IQueryHandler<GetPostByIDQuery>{
    constructor(
        private readonly postRepository: PostRepository,
    ){}
    
    execute(getPostByIDQuery: GetPostByIDQuery) {
        return this.postRepository.getPostByID(getPostByIDQuery.postID);
    }

}