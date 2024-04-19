import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { CommentCreatedEvent } from "./comment-created-event";

@EventsHandler(CommentCreatedEvent)
export class CommentCreatedHandler implements IEventHandler<CommentCreatedEvent>{
    async handle(event: CommentCreatedEvent) {
        console.log(event);
    }
}