export class CommentCreatedEvent {
    constructor(public readonly postID: string, public readonly parentID?: string){}
}