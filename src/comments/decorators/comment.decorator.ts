import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Comment = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const postID = request.params['postid'];
    const result = {postID: postID}

    if(request.user){ result['userID'] = request.user?.userID;}
    result["content"] = request.body?.content;
    result["parentID"] = request.body?.parentID;
    return result; 
  },
);