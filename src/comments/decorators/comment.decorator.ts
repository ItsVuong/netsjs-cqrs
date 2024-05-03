import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Comment = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const postID = request.params['postid'];
    const result = {postID: postID}

    if(request.user){ result['userID'] = request.user.userID;}
    if(request.params['commentid']){result['parentID'] = request.params['commentid'];}
    result["content"] = request.body.content
    return result; 
  },
);